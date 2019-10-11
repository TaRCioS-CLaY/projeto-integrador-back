import app from './server'
import sequelize from './database/conexao'


app.listen('3333', () => {
    console.log('Servidor rodando na Porta: 3333...');
})
// req.query = Acessar query params (para filtros)
// req.params = Acessar reoute params (para edição, delete)
// req.boydy = Acessar corpo da requisição





