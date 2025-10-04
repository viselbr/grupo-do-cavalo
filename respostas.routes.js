const express = require("express");
const router = express.Router();
const respostasController = require("../controllers/respostas.controllers");

// Rotas corretas
router.get("/", respostasController.listarRespostas);          
router.get("/:id", respostasController.buscarResposta);        
router.post("/", respostasController.cadastrarResposta);       
router.put("/:id", respostasController.atualizarResposta);     
router.delete("/:id", respostasController.apagarResposta);     

module.exports = router;
