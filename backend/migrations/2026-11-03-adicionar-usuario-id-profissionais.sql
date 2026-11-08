-- Execute uma única vez no banco divulgar_trabalhos antes de testar o cadastro profissional.
ALTER TABLE profissionais
ADD COLUMN usuario_id INT NULL UNIQUE;

-- Opcional: depois de conferir que a tabela usuarios usa id INT, adicione a chave estrangeira:
-- ALTER TABLE profissionais
-- ADD CONSTRAINT fk_profissionais_usuario
-- FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
-- ON DELETE SET NULL ON UPDATE CASCADE;
