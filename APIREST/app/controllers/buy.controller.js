const db   = require("../models");
const Buy  = db.buy;
const Op   = db.Sequelize.Op;

// Crear una nueva compra
exports.create = (req, res) => 
{
    // Validar consulta
    if (!req.body.date_buy && !req.body.id_client && !req.body.id_cart) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a buy
    const buy = {
        date_buy:   req.body.date_buy,
        id_client:  req.body.id_client,
        id_cart:    req.body.id_cart
    };
    // Guardar en base de datos
    Buy.create(buy) // okey? entonces devuelve la data
    .then(data => {
        res.send(data);
    })
    .catch(err => {     // error 500: 
        res.status(500).send({ message: err.message || "Error al crear una nueva compra"});
    });
};

// Retornar las compras de la base de datos.
exports.findAll = (req, res) => 
{
    const id = req.query.id_buy;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
    Buy.findAll({ where: condition }) // busca las tuplas que coincida con la condición
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error en la búsqueda"});
    });
};