import conexao from './../database/conexao';
import enviarEmail from './mailjet.api.service';
import schedule from 'node-schedule';
import moment from 'moment';
import gerarPdf from './pdftemplates.service';
import { getDespesasById } from '../routes';

const banco = conexao();
const modelos = banco.models;
const Agendamento = modelos.agendamento;
const Beneficiario = modelos.beneficiario;

/**
 * Monitora o banco a procura de novos agendamentos
 */
export const monitorarbanco = async () => {
  setInterval(() => {
    let beneficiarios;
    getAllBeneficiarios().then((dados) => beneficiarios = dados);

    getAllAgendamentos().then((dados) => {
      const agendamentos = verificaAgendamentos(dados);
      if (!agendamentos.length) {
        return console.log('sem agendamentos ', agendamentos);
      }
      agendamentos.forEach(async (agendamento) => {
        const email = pegarEmail(beneficiarios, agendamento.nr_matricula);
        const beneficiario = beneficiarios.find((e) => e.nr_matricula === agendamento.nr_matricula);
        const despesas = await getDespesasById(beneficiario.nr_matricula);
        console.log('Despesas: ', despesas);
        if(despesas.length > 0){gerarPdf(beneficiario, despesas); }
        
        console.log('Gerou o pdf');
        
        // enviarEmail(
        //  'email, 'Teste',
        //  'Testando envio de email',
        //   'Testando essa bagaça'
        //   )
        // enviarEmail(
        // beneficiario.ds_email, beneficiario.nm_beneficiario,
        // 'Agendamento',
        // `${beneficiario.nm_beneficiario} você possui um agendamento para o dia ${moment(agendamento.dt_agenda).format('DD/MM/YYYY')} as ${agendamento.hr_inicio}`
        //  )
        //   .then(() => alteraFlagNotificationNoBanco(agendamento)).catch(e => console.log('Erro ', e) );
          console.log('Email enviado teoricamente')
      })
      // console.log('Agendamentos ', agendamentos);
    });
  }
    , 10000);
}



/**
 * Fim  do monitoramento
 */



/**
 * Recupera todos os agendamentos do banco
 * @returns {Promise<[{}]>} Retorna um array com todos os agendamentos
 */
const getAllAgendamentos = async () => await Agendamento.findAll();

/**
 * Recebe um array de agendamentos e verifica o valor da flag de notificação no banco
 * @param {[]} agendamentos Array de agendamento a ser verificado
 * @returns {[]} Retorna um array com todos os agendamentos que estão com a flag de notificação como falsa no banco
 */
const verificaAgendamentos = (agendamentos) =>
  agendamentos.filter((agendamento) => (agendamento.vl_push_notificacao === 'f'));

/**
 * Recebe um agendamento e altera o valor da notificação no banco
 * @param {{}} agendamento Agendamento que vai sofrer o update
 * @returns {boolean} Retorna true caso dê tudo certo ou false caso dê errado
 */
const alteraFlagNotificationNoBanco = (agendamento) =>
  Agendamento.update({ vl_push_notificacao: 't' }, { where: { cd_agenda: agendamento.cd_agenda } })
    .then(() => {
      console.log('Alterado com sucesso');
      return true;
    })
    .catch((e) => {
      console.error('Ocorreu um erro ao fazer update no banco. Erro: ', e);
      return false;
    });

/**
 * Recupera todos os beneficiarios do banco
 * @returns {Promise<[{}]>} Retorna um array com todos os beneficiarios
 */
const getAllBeneficiarios = async () => await Beneficiario.findAll();

/**
 * Pega o email da matricula passada
 * @param {[]} beneficiarios Array de beneficiarios
 * @param {string} matricula Matricula a ser encontrada no array
 * @returns {string} O email correspondente a matricula informada
 */
const pegarEmail = (beneficiarios, matricula) => {
  const beneficiario = beneficiarios.find((pessoa) => pessoa.nr_matricula == matricula)
  return beneficiario.ds_email;
};


// Query da atendimentos por medico select ate.dt_atendimento, cd.ds_credenciado, pr.ds_procedimento, pr.vl_procedimento from atendimento ate left join procedimento pr on ate.cd_procedimento = pr.cd_procedimento left join credenciado cd on ate.cd_credenciado = cd.cd_credenciado where ate.cd_credenciado = 1;