-- database/script.sql

-- Criação da tabela de animais
CREATE TABLE IF NOT EXISTS animais (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    especie TEXT,
    raca TEXT,
    idade INTEGER,
    dono TEXT
);

-- Criação da tabela de serviços
CREATE TABLE IF NOT EXISTS servicos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT NOT NULL,
    data TEXT NOT NULL,
    observacoes TEXT,
    animal_id INTEGER NOT NULL,
    FOREIGN KEY (animal_id) REFERENCES animais(id)
);
