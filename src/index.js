import app from './server';
import conexao from './database/conexao';
const server = app;

server.db = conexao();
const banco = server.db.sequelize;
let port = process.env.PORT || 3000;
// Sobe o servidor.
server.listen(port, () => {

    banco.authenticate()
        .then(() => console.log('Banco autenticado com sucesso.')).then(() => {
            banco.sync().then(() => {
                console.log('Banco sincronizado com sucesso.');
                console.log(`Servidor rodando na Porta: ${port}...`);
            })
                .catch((e) => console.error('Não foi possível sincronizar o banco. Erro: ', e))
        })
        .catch((e) => console.error('Não foi possível autenticar o banco. Erro: ', e));
})