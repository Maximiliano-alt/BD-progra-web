const db       = require("../models");
const Provider = db.provider;
const Op       = db.Sequelize.Op;

// Crear un nuevo proveedor
exports.create = (req, res) => 
{
    // Validar consulta
    if (!req.body.rut) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a proveedor
    const provider = {
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

//Retornar los proveedores de la base de datos.
exports.findAll = (req, res) =>
{
    const {rut, first, last}  = req.query; //...../all ? id = 1
    var condition1 = (rut)? {rut: rut} : null;
    var condition2 = (first || last)? { [Op.or]: [{ first_name: first? `%${first}%`: null}, { last_name: last? `%${last}%` : null }]  } : null;

    Provider.findAll({ 
        include: [{
            model: db.user,
            as: 'providerUser',
            attributes: { exclude: ["password","updatedAt"] },
            where: condition2
        }],
        where: condition1,    // busca las tuplas que coincida con la codición
        attributes: { exclude: ["createdAt","updatedAt","rut"] }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error en la búsqueda"});
    });
};

// Buscar un provedor por su id
exports.findOne = (req, res) => 
{
    const {id_provider} = req.params;

    Provider.findByPk(id_provider, {  // buscar por id
        include: [{
            model: db.user,
            as: 'providerUser',
            attributes: { exclude: ["password", "updatedAt"] }
        }],
        attributes: { exclude: ["createdAt", "updatedAt", "rut"] }
    })
    .then(data => {
        if (data) res.send(data); // existe el dato? entrega la data
        else      res.status(404).send({ message: `No se encontró al proveedor`});
    })
    .catch(err => {
        res.status(500).send({ message: "Error en la búsqueda"});
    });
};

// actualizar un provedor por su id
exports.update = (req, res) => 
{
    const id = req.params.id_provider;

    Provider.update(req.body, {  where: { id_provider: id }})
    .then(num => {
        if (num == 1) res.send({ message: "Proveedor actualizado."});
        else          res.send({ message: `No se pudo actualizar al proveedor`});
    })
    .catch(err => {
        res.status(500).send({ message: "Error en actualización"});
    });
     
};

// eliminar un provedor
exports.delete = (req, res) => 
{
    const id = req.params.id_provider;

    Provider.destroy({where: { id_provider: id }})
    .then(num => {
        if (num == 1) res.send({ message: "Proveedor eliminado" });
        else          res.send({ message: `Proveedor no encontrado`});
    })
    .catch(err => {
        res.status(500).send({ message: "Error al eliminar proveedor"});
    });
};

// eliminar a todos los proveedores
exports.deleteAll = (req, res) => 
{
    Provider.destroy({ where: {}, truncate: false })
    .then(nums => {
        res.send({ message: `${nums} proveedores eliminados!` });
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error al eliminar a todos los proveedores." });
    });
    
};
