const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuarios.controllers"); 

router.get("/", usuariosController.listarUsuarios);          
router.get("/:id", usuariosController.buscarUsuario);        
router.post("/", usuariosController.cadastrarUsuario);       
router.put("/:id", usuariosController.atualizarUsuario);     
router.delete("/:id", usuariosController.apagarUsuario);     

module.exports = router;
