// Importar dependencias
const db = require("../models");
const Client = db.client;
const Op = db.Sequelize.Op;

// Crear un nuevo cliente
exports.create = (req, res) => 
{
    // Validar consulta
    if (!req.body.rut) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a Cliente
    const client = {
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

// Retornar los clientes de la base de datos o con id especificado.
exports.findAll = (req, res) => 
{
    const { id }  = req.query; //...../all ? id = 1
    let condition = id ? { id_client: { [Op.like]: `%${id}%` } } : null;

    Client.findAll({ where: condition }) // busca las tuplas que coincida con la codición
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send({ message: err.message || "Error en la búsqueda"});
    });
};

// busca el correo y rut de todos los clientes o con id especificado
exports.findNameMail = (req, res) =>
{
    const {id}    = req.query;
    var condition = id ? { id_client: { [Op.like]: `%${id}%` } } : null;

    Client.findAll({ 
        include: [{ 
            model: db.user, 
            attributes: ["first_name","last_name","mail"]
        }], 
        where: condition,  // busca las tuplas que coincida con la codición
        attributes: { exclude: ["id_client", "rut", "createdAt", "updatedAt"]} // para atributos que no se necesitan recoger
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error en la búsqueda"});
    });
}

// Buscar un cliente por su id
exports.findOne = (req, res) => 
{
    const id = req.params.id_client;

    Client.findByPk(id) // busacar por id
    .then(data => {
        if (data) res.send(data); // existe el dato? entrega la data
        else      res.status(404).send({ message: `No se encontró al cliente.`});
    })
    .catch(err => {
        res.status(500).send({ message: "Error en la búsqueda"});
    });
};

exports.findAllBuysById = (req, res) =>
{
    const id      = req.params?.id_client;
    var condition = id ? { id_client: id } : null;

    Client.findAll({ 
        include: [{
            model: db.cart,
            through: { attributes: [] }, //through: { attributes: [] }: para no obtener atributos de la tabla de union entre cliente y carro
            attributes: ["id_cart"],
            include: [{
                model: db.purchasedProduct,
                attributes: ["units"],
                include: [{
                    model: db.product,
                    attributes: ["name_product", "price"]
                }],
            }],
        }],
        where: condition,
        attributes: { exclude: ["id_client", "rut", "createdAt", "updatedAt"]}
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send({ message: err.message || "Error en la búsqueda"});
    });
}

// actualizar un cliente por su id
exports.update = (req, res) => 
{
    const id = req.params.id_client;

    Client.update(req.body, {  where: { id_client: id }})
    .then(num => {
        if (num == 1) res.send({ message: "Cliente actualizado."});
        else          res.send({ message: `No se pudo actualizar al cliente`});
        
    })
    .catch(err => {
        res.status(500).send({ message: "Error en actualización"});
    });   
};

// eliminar un cliente
exports.delete = (req, res) => 
{
    const id = req.params.id_client;

    Client.destroy({where: { id_client: id }})
    .then(num => {
        if (num == 1) res.send({ message: "Cliente eliminado" });
        else          res.send({ message: `Cliente no encontrado`});
        
    })
    .catch(err => {
        res.status(500).send({ message: "Error al eliminar cliente"});
    });
};

// eliminar a todos los clientes
exports.deleteAll = (req, res) => 
{
    Client.destroy({ where: {}, truncate: false })
    .then(nums => {
        res.send({ message: `${nums} clientes eliminados!` });
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error al eliminar a todos los clientes." });
    });
};
