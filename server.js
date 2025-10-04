const express = require("express");
const cors = require("cors");

const usuariosRoutes = require("./src/routes/usuarios.routes");
const respostasRoutes = require("./src/routes/respostas.routes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/usuarios", usuariosRoutes);     
app.use("/respostas", respostasRoutes);   

app.listen(3000, () => {
    console.log("Servidor online na porta 3000");
});
