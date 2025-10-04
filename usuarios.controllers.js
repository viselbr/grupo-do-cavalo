const db = require("../data/connection.data");

const listarUsuarios = async (req, res) => {
    const lista = await db.query("SELECT * FROM usuarios");
    res.json(lista[0]).end();
};

const buscarUsuario = async (req, res) => {
    const idUsuario = req.params.id;
    const usuario = await db.query("SELECT * FROM usuarios WHERE id = ?", [idUsuario]);
    res.json(usuario[0][0]).end();
};

const cadastrarUsuario = async (req, res) => {
    const { nome, idade } = req.body;
    try {
        const result = await db.query(
            "INSERT INTO usuarios (nome, idade) VALUES (?, ?)",
            [nome, idade]
        );
        res.status(201).json({ msg: "Usuário cadastrado!", id: result[0].insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Erro ao cadastrar usuário" });
    }
};

const apagarUsuario = async (req, res) => {
    const idUsuario = req.params.id;
    try {
        const deletarUsuario = await db.query("DELETE FROM usuarios WHERE id = ?", [idUsuario]);

        const info = {msg:""};

        if (deletarUsuario[0].affectedRows === 1) {
            info.msg = "Excluído com sucesso";
        } else if (deletarUsuario[0].affectedRows === 0) { 
            info.msg = "Usuário não encontrado";
        }

        res.status(201).json(info).end();
    } catch (error) {
        const info = {msg:""};
        
        if (error.errno === 1451) {
            info.msg = "Usuário com locação";
        }

        res.status(500).json(info).end();
    }
};

const atualizarUsuario = async (req, res) => {
    const id = req.params.id;
    const { nome, idade } = req.body;
    try {
        const result = await db.query(
            "UPDATE usuarios SET nome = ?, idade = ? WHERE id = ?",
            [nome, idade, id]
        );
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }
        res.json({ msg: "Usuário atualizado!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Erro ao atualizar usuário" });
    }
};

module.exports = {
    listarUsuarios,
    buscarUsuario,
    cadastrarUsuario,
    apagarUsuario,
    atualizarUsuario
};