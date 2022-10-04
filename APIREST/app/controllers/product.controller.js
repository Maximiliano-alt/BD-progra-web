const db      = require("../models");
const Product = db.product;
const Op      = db.Sequelize.Op;

// Crear un nuevo producto
exports.create = (req, res) => 
{
    // Validar consulta (campos no vacios)
    if (!req.body.category && !req.body.name_product && !req.body.mark && !req.body.price && !req.body.stock && !req.body.id_provider) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a product
    const product = {
        category:       req.body.category,
        name_product:   req.body.name_product,
        mark:           req.body.mark,
        price:          req.body.price,
        description:    req.body.description,
        stock:          req.body.stock,
        id_provider:    req.body.id_provider
    };
    // Guardar en base de datos
    Product.create(product) // okey? entonces devuelve la data 
    .then(data => {
        res.send(data);
    })
    .catch(err => {     // error 500: 
        res.status(500).send({ message: err.message || "Error al crear un nuevo producto"});
    });
};

//asignar condicion de acuerdo al filtro por parámetro
const filter = (req) =>
{
    const {name, ctgry, price} = req.query;

    if (ctgry && price && name) return {[Op.and]: [{ category: { [Op.like]: `%${ctgry}%`}}, { price: { [Op.lte]: price }}, {name_product: { [Op.like]: `%${name}%`}}]};
    else if (ctgry && price)    return {[Op.and]: [{ category: ctgry}, { price: { [Op.lte]: price }}]};
    else if (name && price)     return {[Op.and]: [{name_product: { [Op.like]: `%${name}%`}}, { price: { [Op.lte]: price }}]};
    else if (ctgry && name)     return {[Op.and]: [{ category: ctgry}, {name_product: { [Op.like]: `%${name}%`}}]};
    else{
        return (ctgry || price || name)? {[Op.or]: [{ category: { [Op.like]: `%${ctgry}%`}}, { price: { [Op.lte]: price }}, {name_product: { [Op.like]: `%${name}%`}}]} : null;
    }
}

//Retornar los productos de la base de datos.
exports.findAll = (req, res) => 
{
    var condition = filter(req);

    Product.findAll({
        attributes: { exclude: (req.query.typeAccount=="A")? [] : ["id_product","id_provider", "createdAt","updatedAt"] },
        where: condition    // busca las tuplas que coincida con la codición
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error en la búsqueda"});
    });
};

exports.findAllByStock= (req, res) =>
{
    const { stock } = req.params;
    var condition   = (stock>=0)? { stock: { [Op.eq]: stock } } : null;

    Product.findAll({ where: condition })
    .then(data => {
        if (!condition) res.send({ message: "Valor de stock incorrecto"});
        else            res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error en la búsqueda por categoría"});
    });
}

// Buscar un producto por su id (provider) o name (client)
exports.findOne = (req, res) => 
{
    const {id, name} = req.query;
    var condition = null;

    if (id)         condition = { id_product: {[Op.like]: `%${id}%`} };
    else if (name)  condition = { name_product: {[Op.like]: `%${name}%`} };

    Product.findOne({
        attributes: { exclude: (id && !name)? [] : ["id_product","category","id_provider", "createdAt","updatedAt"]},
        where: condition
    })
    .then(data => {
        if (data) res.send(data); // existe el dato? entrega la data
        else      res.status(404).send({ message: `No se encontró el producto`});
    })
    .catch(err => {
        res.status(500).send({ message: "Error en la búsqueda"});
    });
};

// actualizar un producto por su id
exports.update = (req, res) => 
{
    const id = req.params.id_product;

    Product.update(req.body, { where: { id_product: id } })
    .then(num => {
        if (num == 1) res.send({ message: "Producto actualizado."});
        else          res.send({ message: `No se pudo actualizar el producto`});
        
    })
    .catch(err => {
        res.status(500).send({ message: "Error en actualización"});
    });
};

// eliminar un producto
exports.delete = (req, res) => 
{
    const id = req.params.id_product;

    Product.destroy({where: { id_product: id }})
    .then(num => {
        if (num == 1) res.send({ message: "Producto eliminado" });
        else          res.send({ message: `Producto no encontrado`});
        
    })
    .catch(err => {
        res.status(500).send({ message: "Error al eliminar producto"});
    });
};

// eliminar todos los produtos
exports.deleteAll = (req, res) => 
{
    Product.destroy({ where: {}, truncate: false })
    .then(nums => {
        res.send({ message: `${nums} productos eliminados!` });
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error al eliminar a todos los productos." });
    });
};
