// Importar dependencias
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

// Crear un nuevo usuario
exports.create = (req, res) => 
{
    // Validar consulta
    if (!req.body.first_name && !req.body.last_name && !req.body.rut && !req.body.direction && !req.body.mail && !req.body.password) {
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
exports.findAll = (req, res) => 
{
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

// Buscar un usuario por su id
exports.findOne = (req, res) => {
    const id = req.params.rut;

    User.findByPk(id) // busacar por id
    .then(data => {
        if (data) res.send(data); // existe el dato? entrega la data
        else      res.status(404).send({ message: `No se encontró al usuario.`});
    })
    .catch(err => {
        res.status(500).send({ message: "Error en la búsqueda"});
    });
     
};

// actualizar un usuario por su id
exports.update = (req, res) => {
    const id = req.params.rut;

    Client.update(req.body, {  where: { rut: id }})
    .then(num => {
        if (num == 1) res.send({ message: "Usuario actualizado."});
        else          res.send({ message: `No se pudo actualizar al usuario`});
        
    })
    .catch(err => {
        res.status(500).send({ message: "Error en actualización"});
    });
     
};

// eliminar un cliente
exports.delete = (req, res) => 
{
    const id = req.params.rut;
    User.destroy({where: { rut: id }})
    .then(num => {
       res.send(num ? { message: "User eliminado" } : { message: `User no encontrado`});
        
    })
    .catch(err => {
        res.status(500).send({ message: "Error al eliminar usuario"});
    });
};

// eliminar a todos los usuarios
exports.deleteAll = (req, res) => {

    User.destroy({ where: {}, truncate: false })
    .then(nums => {
        res.send({ message: `${nums} usuarios eliminados!` });
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error al eliminar a todos los usuarios." });
    });
    
};