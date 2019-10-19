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
routes.get('/demonstrativo', async (req, res) => {
    return res.json(await getDemonstrativos());
});
// Busca todos os beneficiários.
routes.get('/beneficiarios', async (req,res) => res.json(await Beneficiario.findAll({
    attributes: [['nr_matricula', 'nr_matricula'],['nm_beneficiario', 'nm_beneficiario']],
    })));

// Função para executar a query de demonstrativos.
function getDemonstrativos() {
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

export default routes;