import app from './server';
import conexao from './database/conexao';
const server = app;

server.db = conexao();
const banco = server.db.sequelize;

// Sobe o servidor.
server.listen('3333', () => {

    banco.authenticate()
        .then(() => console.log('Banco autenticado com sucesso.')).then(() => {
            banco.sync().then(() => {
                console.log('Banco sincronizado com sucesso.');
                console.log('Servidor rodando na Porta: 3333...');
            })
                .catch((e) => console.error('Não foi possível sincronizar o banco. Erro: ', e))
        })
        .catch((e) => console.error('Não foi possível autenticar o banco. Erro: ', e));
})