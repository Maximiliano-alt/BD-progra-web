const db       = require("../models");
const Provider = db.provider;
const Op       = db.Sequelize.Op;

// Crear un nuevo proveedor
exports.create = (req, res) => {
    // Validar consulta
    if (!req.body.rut) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a proveedor
    const provider = {
        id: req.body.id_client,
        rut: req.body.rut
    };
    // Guardar en base de datos
    Provider.create(provider) // okey? entonces devuelve la data 
    .then(data => {
        res.send(data);
    })
    .catch(err => {     // error 500: 
        res.status(500).send({ message: err.message || "Error al crear un nuevo provedor"});
    });
};

//Retornar los clientes de la base de datos.
exports.findAll = (req, res) => {
    const id = req.query.id_provider;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
    Provider.findAll({ where: condition }) // busca las tuplas que coincida con la codición
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error en la búsqueda"});
    });
};