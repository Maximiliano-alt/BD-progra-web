const db   = require("../models");
const Cart = db.cart;
const Op   = db.Sequelize.Op;

// Crear un nuevo carro-compra
exports.create = (req, res) => 
{
    // Validar consulta
    if (!req.body.total_products && !req.body.total_price) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a cart
    const cart = {
        total_products: req.body.total_products,
        total_price:    req.body.total_price
    };
    // Guardar en base de datos
    Cart.create(cart) // okey? entonces devuelve la data
    .then(data => {
        res.send(data);
    })
    .catch(err => {     // error 500: 
        res.status(500).send({ message: err.message || "Error al crear un nuevo carro"});
    });
};

//Retornar los carros de la base de datos.
exports.findAll = (req, res) => 
{
    const id = req.query.id_cart;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
    Cart.findAll({ where: condition }) // busca las tuplas que coincida con la codición
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error en la búsqueda"});
    });
};

// Buscar un carro por su id
exports.findOne = (req, res) => 
{
    const id = req.params.id_cart;
    Cart.findByPk(id) // buscar por id

    .then(data => {
        if (data) res.send(data); // existe el dato? entrega la data
        else      res.status(404).send({ message: `No se encontró el carro.`});
    })
    .catch(err => {
        res.status(500).send({ message: "Error en la búsqueda"});
    });
     
};

// actualizar un carro por su id
exports.update = (req, res) => 
{
    const id = req.params.id_cart;
    Cart.update(req.body, {  where: { id_cart: id }})

    .then(num => {
        if (num == 1) res.send({ message: "Carro actualizada."});
        else          res.send({ message: `No se pudo actualizar el carro`});
        
    })
    .catch(err => {
        res.status(500).send({ message: "Error en actualización"});
    });
     
};

// eliminar un carro
exports.delete = (req, res) => 
{
    const id = req.params.id_cart;
    Cart.destroy({where: { id_cart: id }})

    .then(num => {
        if (num == 1) res.send({ message: "Carro eliminada" });
        else          res.send({ message: `Carro no encontrado`});
    })
    .catch(err => {
        res.status(500).send({ message: "Error al eliminar carro"});
    });
};

// eliminar todos los carros
exports.deleteAll = (req, res) => 
{
    Cart.destroy({ where: {}, truncate: false })
    .then(nums => {
        res.send({ message: `${nums} Carros eliminados!` });
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error al eliminar todos los carros." });
    });
    
};