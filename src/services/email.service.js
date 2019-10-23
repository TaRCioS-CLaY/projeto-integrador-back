import conexao from './../database/conexao';

const banco = conexao();
const modelos = banco.models;
const Agendamento = modelos.agendamento;

/**
 * Monitora o banco a procura de novos agendamentos
 */
export const monitorarbanco = () =>{
    setInterval(()=> {
    getAllAgendamentos().then((dados)=> {
        verificaAgendamentos(dados)
    });
    }
    , 10000);
}


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
const verificaAgendamentos = (agendamentos) => {
    const emailsParaEnviar = agendamentos.map((agendamento) => {
        if (agendamento.vl_push_notificacao === 't'){
            return;
        }
        return agendamento;
    });
    return emailsParaEnviar;
}

const enviarEmail = () => todo; //todo

/**
 * Recebe um agendamento e altera o valor da notificação no banco
 * @param {{}} agendamento Agendamento que vai sofrer o update
 * @returns {boolean} Retorna true caso dê tudo certo ou false caso dê errado
 */
const alteraFlagNotificationNoBanco = (agendamento) => Agendamento.update({vl_push_notificacao: 't'},
                                                                          {where: {ce_agenda: agendamento.ce_agenda}})
                                                                          .then(() => {
                                                                              console.log('Alterado com sucesso');
                                                                              return true;
                                                                          })
                                                                          .catch((e) => {
                                                                              console.error('Ocorreu um erro ao fazer update no banco. Erro: ', e);
                                                                              return false;
                                                                          });