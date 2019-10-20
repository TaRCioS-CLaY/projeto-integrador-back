import express from 'express';
import conexao from './database/conexao';
const banco = conexao()

// Modelos das tabelas.
const modelos = banco.models;
const Agendamento = modelos.agendamento;
const Atendimento = modelos.atendimento;
const Beneficiario = modelos.beneficiario;
const Credenciado = modelos.credenciado;
const Especialidade = modelos.especialidade;
const Funcionario = modelos.funcionario;
const Procedimento = modelos.procedimento;


const routes = express.Router();


// Busca os demonstrativos.
routes.get('/demonstrativos', async (req, res) => {
    if (!req.query.id) {
        return res.json(await getAllDemonstrativos());
    }
    console.log('Request Id:', req.query.id);
    return res.json(await getDemonstrativosById(req.query.id));
});

// Busca todos os beneficiários.
routes.get('/beneficiarios', async (req, res) => res.json(await Beneficiario.findAll({
    attributes: [['nr_matricula', 'nr_matricula'], ['nm_beneficiario', 'nm_beneficiario']],
})));


// Função para executar a query que traz todos os demonstrativos.
function getAllDemonstrativos() {
    return new Promise((resolve, reject) => {
        banco.sequelize.query('select ate.dt_atendimento, cd.ds_credenciado, pr.ds_procedimento, pr.vl_procedimento ' +
            'from atendimento ate ' +
            'left join procedimento pr on ate.cd_procedimento = pr.cd_procedimento ' +
            'left join credenciado cd on ate.cd_credenciado = cd.cd_credenciado;'
        )
            .then(([results, metadata]) => resolve(results))
            .catch((err) => reject(err));
    })
}

// Função para executar a query que traz o demonstrativo por filtrado por id.
function getDemonstrativosById(id) {
    return new Promise((resolve, reject) => {
        banco.sequelize.query('select ate.dt_atendimento, cd.ds_credenciado, pr.ds_procedimento, pr.vl_procedimento ' +
            'from atendimento ate ' +
            'left join procedimento pr on ate.cd_procedimento = pr.cd_procedimento ' +
            'left join credenciado cd on ate.cd_credenciado = cd.cd_credenciado ' +
            'where ate.nr_matricula = ' + id + ';'
        )
            .then(([results, metadata]) => resolve(results))
            .catch((err) => reject(err));
    })
}

export default routes;