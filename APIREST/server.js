//Importar dependencias
const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const app = express();

app.use(cors());          //configuración de cors (control de acceso)
app.use(express.json()); // analizar las solicitudes de tipo de contenido - application/json
app.use(express.urlencoded({ extended: true })); // analizar las solicitudes de tipo de contenido - application/x-www-form-urlencoded

// en producción
db.sequelize.sync({alter: true})
  .then(() => {
      console.log("Synced db.");
  })
  .catch((err) => {
      console.log("Failed to sync db: " + err.message);
  });
// en desarrollo
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

require("./app/routes/user.routes")(app);
require("./app/routes/client.routes")(app);
require("./app/routes/provider.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/buy.routes")(app);
require("./app/routes/cart.routes")(app);
require("./app/routes/purchasedProduct.routes")(app);

// ruta simple
app.get("/", (req, res) => {
  res.json({ message: "Welcome to electonicECOM page." });
});

// Configurar puertos
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
