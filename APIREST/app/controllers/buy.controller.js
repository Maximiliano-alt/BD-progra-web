const db  = require("../models");
const Buy = db.buy;
const Op  = db.Sequelize.Op;

const isValidPurchased = (purchased) =>
{
    return (purchased.id_product && purchased.units);
}

const isValidBoughtProducts = (purchasedProds) =>
{
    const size = purchasedProds.size();
    if (size == 0) return false;
    
    for (p=0; p<size; ++p){
        if (!isValidPurchased(purchasedProds[p])) return false;
    }
    return true;
}

const isValidBuy = (req)=>
{
    return (req.body.date_buy && req.body.total_products && req.body.total_price && req.body.id_client);
}

const isDataValid = (req) =>
{
    return (isValidBuy(req) && isValidBoughtProducts(req.body.purchasedProds));
}

const availableStock = (purchasedProds) =>
{
    
}

const createPurchasedProducts = (req, id_buy, res) =>
{
    const size      = req.body.purchasedProds.size();
    const Purchased = db.purchasedProduct();

    for (p=0; p<size; ++p)
    {
        Purchased.create({
            units:      req.body.purchasedProds[p].units,
            id_buy:     id_buy,
            id_product: req.body.purchasedProds[p].id_product
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {     // error 500: 
            res.status(500).send({ message: err.message || "Error al crear un nuevo producto comprado"});
        });
    }
}

const discountStock = (req) =>
{
    size = req.body.purchasedProds.size();
    for (p=0; p<size; ++p){

    }
}

// Crear una nueva compra
exports.create = (req, res) => 
{
    // Validar consulta
    if (!isDataValid(req)){
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    if (!availableStock(req.body.purchasedProds)){
        res.status(400).send({ message: "!" });
        return;
    }

    // Create a buy
    const buy = {
        date_buy:       req.body.date_buy,
        total_products: req.body.total_products,
        total_price:    req.body.total_price*1.19,
        id_client:      req.body.id_client
    };
    // Guardar en base de datos
    const by = Buy.create(buy) // okey? entonces devuelve la data
    .then(data => {
        res.send(data);
    })
    .catch(err => {     // error 500: 
        res.status(500).send({ message: err.message || "Error al crear una nueva compra"});
    });

    discountStock(req);
    createPurchasedProducts(req, by.id_buy, res); // instaciar en bd tosos los productos comprados
};

const filter = (req) =>
{
    const {id_cl, date} = req.query;

    if (id_cl && date) return { [Op.and]: [{ id_client: { [Op.like]: `%${id_cl}%`} }, { date_buy: { [Op.lte]: date} }] };
    else return (id_cl || date)? { [Op.or]: [{ id_client: { [Op.like]: `%${id_cl}%`} }, { date_buy: { [Op.lte]: date} }] } : null; 
}

// Retornar las compras de la base de datos.
exports.findAll = (req, res) => 
{
    var condition = filter(req);

    Buy.findAll({ 
        attributes: {exclude:["createdAt", "updatedAt", "id_client"]},
        where: condition, 
        include: [{
            model: db.client,
            as: 'buyerClient',
            attributes: { exclude: ["rut","updatedAt", "createdAt"] },
            include: [{
                model: db.user,
                as: "clientUser",
                attributes: { exclude: ["direction","password","updatedAt", "createdAt"] }
            }]
        }]
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
