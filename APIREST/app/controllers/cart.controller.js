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

exports.deleteById