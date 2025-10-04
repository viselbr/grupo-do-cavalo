CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    idade INT
);

CREATE TABLE respostas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    membro_escolhido VARCHAR(150),
    melhorias VARCHAR(500),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);
