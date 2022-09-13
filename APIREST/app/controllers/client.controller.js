// Importar dependencias
const db = require("../models");
const Client = db.client;
const Op = db.Sequelize.Op;

// Crear un nuevo cliente
exports.create = (req, res) => {
    // Validar consulta
    if (!req.body.rut) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a Cliente
    const client = {
        id: req.body.id_client,
        rut: req.body.rut
    };
    // Guardar en base de datos
    Client.create(client) // okey? entonces devuelve la data 
    .then(data => {
        res.send(data);
    })
    .catch(err => {     // error 500: 
        res.status(500).send({ message: err.message || "Error al crear un nuevo cliente"});
    });
};

//Retornar los clientes de la base de datos.
exports.findAll = (req, res) => {
    const id = req.query.id_client;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
    Client.findAll({ where: condition }) // busca las tuplas que coincida con la codición
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error en la búsqueda"});
    });  
};

// // Buscar un cliente por su id
// exports.findOne = (req, res) => {
//     const id = req.params.id;

//     Client.findByPk(id) // busacar por id
//     .then(data => {
//         if (data) res.send(data); // existe el dato? entrega la data
//         else      res.status(404).send({ message: `No se encontró al cliente.`});
//     })
//     .catch(err => {
//         res.status(500).send({ message: "Error en la búsqueda"});
//     });
     
// };

// // actualizar un cliente por su id
// exports.update = (req, res) => {
//     const id = req.params.id;

//     Client.update(req.body, {  where: { id: id }})
//     .then(num => {
//         if (num == 1) res.send({ message: "Cliente actualizado."});
//         else          res.send({ message: `No se pudo actualizar al cliente`});
        
//     })
//     .catch(err => {
//         res.status(500).send({ message: "Error en actualización"});
//     });
     
// };

// // eliminar un cliente
// exports.delete = (req, res) => {
//     const id = req.params.id;

//     Client.destroy({where: { id: id }})
//     .then(num => {
//         if (num == 1) res.send({ message: "Cliente eliminado" });
//         else          res.send({ message: `Cliente no encontrado`});
        
//     })
//     .catch(err => {
//         res.status(500).send({ message: "Error al eliminar cliente"});
//     });
// };

// // eliminar a todos los clientes
// exports.deleteAll = (req, res) => {

//     Client.destroy({ where: {}, truncate: false })
//     .then(nums => {
//         res.send({ message: `${nums} clientes eliminados!` });
//     })
//     .catch(err => {
//         res.status(500).send({ message: err.message || "Error al eliminar a todos los clientes." });
//     });
    
// };
