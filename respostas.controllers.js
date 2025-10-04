const db = require("../data/connection.data");
const listarRespostas = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM respostas");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro ao listar respostas", error: err.sqlMessage || err.message });
  }
};
const buscarResposta = async (req, res) => {
    const idResposta = req.params.id;
    const resposta = await db.query("SELECT * FROM respostas WHERE id = ?", [idResposta]);
    res.json(resposta[0][0]).end();
};

const cadastrarResposta = async (req, res) => {
  const { nome, idade, membro_escolhido, melhorias } = req.body;

  if (!nome || !membro_escolhido || !melhorias) {
    return res.status(400).json({ msg: "Campos obrigatórios faltando: nome, membro_escolhido, melhorias" });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO respostas (nome, idade, membro_escolhido, melhorias) VALUES (?, ?, ?, ?)",
      [nome, idade || null, membro_escolhido, melhorias]
    );

    res.status(201).json({ msg: "Resposta cadastrada com sucesso!", id: result.insertId });
  } catch (err) {
    console.error("ERRO ao inserir resposta:", err);
    res.status(500).json({ msg: "Erro ao cadastrar resposta", error: err.sqlMessage || err.message });
  }
};


const apagarResposta = async (req, res) => {
    const idResposta = req.params.id;
    try {
        const deletarResposta = await db.query("DELETE FROM respostas WHERE id = ?", [idResposta]);

        const info = {msg:""};

        if (deletarResposta[0].affectedRows === 1) {
            info.msg = "Excluído com sucesso";
        } else if (deletarResposta[0].affectedRows === 0) { 
            info.msg = "Resposta não encontrada";
        }

        res.status(201).json(info).end();
    } catch (error) {
        const info = {msg:""};
        
        if (error.errno === 1451) {
            info.msg = "Resposta com locação";
        }

        res.status(500).json(info).end();
    }
};
const atualizarResposta = async (req, res) => {
    const id = req.params.id;
    const { membro_escolhido, melhorias } = req.body;
    try {
        const result = await db.query(
            "UPDATE respostas SET membro_escolhido = ?, melhorias = ? WHERE id = ?",
            [membro_escolhido, melhorias, id]
        );
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ msg: "Resposta não encontrada" });
        }
        res.json({ msg: "Resposta atualizada!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Erro ao atualizar resposta" });
    }
};

module.exports = {
    listarRespostas,
    buscarResposta,
    cadastrarResposta,
    apagarResposta,
    atualizarResposta
};