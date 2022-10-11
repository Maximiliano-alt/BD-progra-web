const db   = require("../models");
const Buy  = db.buy;
const Op   = db.Sequelize.Op;

// Crear una nueva compra
exports.create = (req, res) => 
{
    // Validar consulta
    if (!req.body.date_buy && !req.body.total_products && !req.body.total_price && !req.body.id_client) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a buy
    const buy = {
        date_buy:       req.body.date_buy,
        total_products: req.body.total_products,
        total_price:    req.body.total_price,
        id_client:      req.body.id_client
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

const filter = (req) =>
{
    const {id_client, date} = req.query;

    if (id_client && date) return { [Op.and]: [{ id_client: { [Op.like]: `%${id_client}%`} }, { date_buy: { [Op.lte]: date} }] };
    else return (id_client || date)? { [Op.or]: [{ id_client: { [Op.like]: `%${id_client}%`} }, { date_buy: { [Op.lte]: date} }] } : null; 
}

// Retornar las compras de la base de datos.
exports.findAll = (req, res) => 
{
    var condition = filter(req);

    Buy.findAll({ 
        attributes: {exclude:["createdAt", "updatedAt"]},
        where: condition 
    }) // busca las tuplas que coincida con la condición
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error en la búsqueda"});
    });
};

// Buscar una compra por su id
exports.findOne = (req, res) => 
{
    const id = req.params.id_buy;
    Buy.findByPk(id) // buscar por id

    .then(data => {
        if (data) res.send(data); // existe el dato? entrega la data
        else      res.status(404).send({ message: `No se encontró la compra.`});
    })
    .catch(err => {
        res.status(500).send({ message: "Error en la búsqueda"});
    });
     
};

// actualizar una compra por su id
exports.update = (req, res) => 
{
    const id = req.params.id_buy;
    Buy.update(req.body, {  where: { id_buy: id }})

    .then(num => {
        if (num == 1) res.send({ message: "Compra actualizada."});
        else          res.send({ message: `No se pudo actualizar la compra`});
        
    })
    .catch(err => {
        res.status(500).send({ message: "Error en actualización"});
    });
     
};

// eliminar una compra
exports.delete = (req, res) => 
{
    const id = req.params.id_buy;
    Buy.destroy({where: { id_buy: id }})

    .then(num => {
        if (num == 1) res.send({ message: "Compra eliminada" });
        else          res.send({ message: `Compra no encontrada`});
    })
    .catch(err => {
        res.status(500).send({ message: "Error al eliminar compra"});
    });
};

// eliminar todas las compras
exports.deleteAll = (req, res) => 
{
    Buy.destroy({ where: {}, truncate: false })
    .then(nums => {
        res.send({ message: `${nums} Compras eliminadas!` });
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error al eliminar todas las compras." });
    });
};
