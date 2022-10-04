const db        = require("../models");
const Purchased = db.purchasedProduct;
const Op        = db.Sequelize.Op;

// Crear un nuevo producto comprado
exports.create = (req, res) => 
{
    // Validar consulta
    if (!req.body.id_product && !req.body.id_cart && !req.body.units) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a purchased product
    const purchased = {
        id_cart: req.body.id_cart,
        id_product: req.body.id_product,
        units: req.body.units,
    };
    // Guardar en base de datos
    Purchased.create(purchased) // okey? entonces devuelve la data
    .then(data => {
        res.send(data);
    })
    .catch(err => {     // error 500: 
        res.status(500).send({ message: err.message || "Error al crear un nuevo producto comprado"});
    });
};

//Retornar los productos comprados de la base de datos.
exports.findAll = (req, res) => 
{
    const {id_cart, name, ctgry} = req.query;

    var condition1 = id_cart? {id_cart: { [Op.like]: `%${id_cart}%`}}: null;
    var condition2 = (name || ctgry)? {[Op.or]: [{ category: { [Op.like]: `%${ctgry}%`}}, { name_product: { [Op.like]: `%${name}%`}}]} : null;

    Purchased.findAll({ 
        include:[{
            model: db.product,
            //required: false,
            attributes: { exclude:["id_product","createdAt","updatedAt", "id_provider", "stock"] },
            where: condition2
        }],
        attributes: { exclude:["updatedAt", "id_product"] },
        where: condition1 // busca las tuplas que coincida con la codición
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error en la búsqueda"});
    });
};

// Buscar producto comprado por id
exports.findOne = (req, res) => 
{
    const {id} = req.params;

    Purchased.findByPk(id, { 
        include: [{ 
            model: db.product,
            required: false,
            attributes: { exclude:["id_product","createdAt","updatedAt", "id_provider"] }
        }],
        attributes: { exclude:["updatedAt", "id_product"] },
    })
    .then(data => {
        if (data) res.send(data); // existe el dato? entrega la data
        else      res.status(404).send({ message: `No se encontró el producto comprado.`});
    })
    .catch(err => {
        res.status(500).send({ message: "Error en la búsqueda"});
    });
};

// actualizar un producto comprado por su id
exports.update = (req, res) => 
{
    const id = req.params.id;
    Purchased.update(req.body, {  where: { id_purchased: id }})

    .then(num => {
        if (num == 1) res.send({ message: "Producto comprado actualizado."});
        else          res.send({ message: `No se pudo actualizar el producto comprado`});
        
    })
    .catch(err => {
        res.status(500).send({ message: "Error en actualización"});
    });
};

// eliminar un producto comprado
exports.delete = (req, res) => 
{
    const id = req.params.id;
    Purchased.destroy({where: { id_purchased: id }})

    .then(num => {
        if (num == 1) res.send({ message: "Producto comprado eliminado" });
        else          res.send({ message: `Producto comprado no encontrado`});
    })
    .catch(err => {
        res.status(500).send({ message: "Error al eliminar producto comprado"});
    });
};

// eliminar todos los productos comprados
exports.deleteAll = (req, res) => 
{
    Purchased.destroy({ where: {}, truncate: false })
    .then(nums => {
        res.send({ message: `Productos comprados eliminados! (${nums})` });
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error al eliminar todos los productos comprados." });
    });
};