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
const {rut, first, last}  = req.query; //...../all ? id = 1
    var condition1 = (rut)? {rut: rut} : null;
    var condition2 = (first || last)? { [Op.or]: [{ first_name: first? first: null }, { last_name: last? last : null }] } : null;

    Client.findAll({
        include: [{
            model: db.user,
            as: 'clientUser',
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
            as: 'clientUser',
            attributes: ["first_name","last_name","mail"]
        }], 
        where: condition,  // busca las tuplas que coincida con la codición
        attributes: { exclude: ["rut", "createdAt", "updatedAt"]} // para atributos que no se necesitan recoger
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error en la búsqueda"});
    });
}

const filter = (req) =>
{
    const {rut, dt_buy, name_pro} = req.query;
    if (rut && dt_buy && name_pro)
        return { [Op.and]: [{ rut: {[Op.like]: `%${rut}%`}}, { '$clientBuys.date_buy$': {[Op.like]: dt_buy}}, {'$clientBuys.purchasedProducts.product.name_product$': {[Op.like]:`%${name_pro}%`}}] };
    else if (rut && dt_buy) 
        return { [Op.and]: [{ rut: {[Op.like]: `%${rut}%`}}, { '$clientBuys.date_buy$': {[Op.like]: dt_buy}}] };
    else if (rut && name_pro)
        return { [Op.and]: [{ rut: {[Op.like]: `%${rut}%`}}, {'$clientBuys.purchasedProducts.product.name_product$': {[Op.like]:`%${name_pro}%`}}] };
    else if (dt_buy && name_pro)
        return { [Op.and]: [{ '$clientBuys.date_buy$': {[Op.like]: dt_buy}}, {'$clientBuys.purchasedProducts.product.name_product$': {[Op.like]:`%${name_pro}%`}}] };
    else 
        return  (rut || dt_buy || name_pro)? {[Op.or]: [{ rut: {[Op.like]: `%${rut}%`}}, { '$clientBuys.date_buy$': {[Op.like]: dt_buy}}, {'$clientBuys.purchasedProducts.product.name_product$': {[Op.like]:`%${name_pro}%`}}]} : null;
}

exports.findAllBuys = (req, res) =>
{
    const condition = filter(req);

    Client.findAll({
        attributes: ['id_client', 'rut'],
        where: condition,
        include: [{
            model: db.buy,
            as: 'clientBuys',
            attributes: ['total_products', 'total_price', 'date_buy'],
            include: [{
                model: db.purchasedProduct,
                as: 'purchasedProducts',
                attributes: ['units'],
                include: [{
                    model: db.product,
                    as: 'product',
                    attributes: ['name_product', 'price'],
                    //required: false  // si esque el producto referenciado no existe, se muestre nulo 
                }]
            }]
        }]
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send({ message: err.message || "Error en la búsqueda"});
    });
}

// Buscar un cliente por su id
exports.findOne = (req, res) =>
{
    const id = req.params.id_client;

    Client.findByPk(id, {  // busacar por id
        include: [{
            model: db.user,
            as: 'clientUser',
            attributes: { exclude: ["password","updatedAt"] }
        }],
        attributes: { exclude: ["createdAt","updatedAt","rut"] }
    })
    .then(data => {
        if (data) res.send(data); // existe el dato? entrega la data
        else      res.status(404).send({ message: `No se encontró al cliente.`});
    })
    .catch(err => {
        res.status(500).send({ message: "Error en la búsqueda"});
    });
};

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
