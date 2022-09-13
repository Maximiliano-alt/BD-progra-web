// Importar dependencias
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

// Crear un nuevo usuario
exports.create = (req, res) => {
    // Validar consulta
    if (!req.body.first_name || !req.body.last_name || !req.body.rut || !req.body.direction || !req.body.mail || !req.body.password) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a user
    const user = {
        first_name: req.body.first_name,
        last_name:  req.body.last_name,
        rut:        req.body.rut,
        direction:  req.body.direction,
        mail:       req.body.mail,
        password:   req.body.password
    };
    // Guardar en base de datos
    User.create(user) // okey? entonces devuelve la data 
    .then(data => {
        res.send(data);
    })
    .catch(err => {     // error 500: 
        res.status(500).send({ message: err.message || "Error al crear un nuevo usuario"});
    });
};

// Retornar los usuarios de la base de datos.
exports.findAll = (req, res) => {
    const first_name = req.query.first_name;
    var condition = first_name ? { first_name: { [Op.like]: `%${first_name}%` } } : null;
    User.findAll({ where: condition }) // busca las tuplas que coincida con la codición
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error en la búsqueda"});
    });
}