const db        = require("../models");
const Purchased = db.purchasedProduct;
const Op        = db.Sequelize.Op;

// Crear un nuevo producto comprado
exports.create = (req, res) => 
{
    // Validar consulta
    if (!req.body.units) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a purchased product
    const purchased = {
        units: req.body.units
    };
    // Guardar en base de datos
    Purchased.create(purchased) // okey? entonces devuelve la data
    .then(data => {
        res.send(data);
    })
    .catch(err => {     // error 500: 
        res.status(500).send({ message: err.message || "Error al crear un nuevo producto comprado"});
    });
};

//Retornar los productos comprados de la base de datos.
exports.findAll = (req, res) => 
{
    const id = req.query.id_product;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
    Purchased.findAll({ where: condition }) // busca las tuplas que coincida con la codición
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error en la búsqueda"});
    });
};

// // Buscar producto/s comprado/s por su id carro
// exports.findOne = (req, res) => 
// {
//     const id = req.params.id_cart;
//     Purchased.findByPk(id) // buscar por id

//     .then(data => {
//         if (data) res.send(data); // existe el dato? entrega la data
//         else      res.status(404).send({ message: `No se encontró el/los producto/s comprado/s.`});
//     })
//     .catch(err => {
//         res.status(500).send({ message: "Error en la búsqueda"});
//     });
     
// };

// // actualizar un producto comprado por su id
// exports.update = (req, res) => 
// {
//     const id = req.params.id_cart;
//     Purchased.update(req.body, {  where: { id_cart: id }})

//     .then(num => {
//         if (num == 1) res.send({ message: "Producto comprado actualizada."});
//         else          res.send({ message: `No se pudo actualizar el producto comprado`});
        
//     })
//     .catch(err => {
//         res.status(500).send({ message: "Error en actualización"});
//     });
     
// };

// eliminar un producto comprado
exports.delete = (req, res) => 
{
    const id = req.params.id_cart;
    Purchased.destroy({where: { id_cart: id }})

    .then(num => {
        if (num == 1) res.send({ message: "Producto/s comprado/s eliminado/s" });
        else          res.send({ message: `Producto/s comprado/s no encontrado/s`});
    })
    .catch(err => {
        res.status(500).send({ message: "Error al eliminar producto/s comprado/s"});
    });
};

// eliminar todos los productos comprados
exports.deleteAll = (req, res) => 
{
    Purchased.destroy({ where: {}, truncate: false })
    .then(nums => {
        res.send({ message: `${nums} Productos comprados eliminados!` });
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error al eliminar todos los productos comprados." });
    });
    
};