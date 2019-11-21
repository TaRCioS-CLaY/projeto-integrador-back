const mailjet = require('node-mailjet')
    .connect('apiKey', 'apiSecret');

/**
 * Envia um email utilizando a Api do Mailjet
 * @param {string} destinatarioEmail Email do Destinatario
 * @param {string} destinatarioNome Nome do Destinatario
 * @param {string} assunto Assunto do email
 * @param {string} corpo Corpo do email
 * @param {string} [remetenteEmail='tarcios.clay@gmail.com'] Opcional
 * @param {string} [remetenteNome='Clayton'] Opcional
 * @returns {Promise} Um log do resultado
 */
const enviarEmail = (destinatarioEmail, destinatarioNome, assunto, corpo, remetenteEmail = 'email', remetenteNome = 'nome', pdf = null) => {
    const request = mailjet
        .post("send", { 'version': 'v3.1' })
        .request({
            "Messages": [
                {
                    "From": {
                        "Email": remetenteEmail,
                        "Name": remetenteNome
                    },
                    "To": [
                        {
                            "Email": destinatarioEmail,
                            "Name": destinatarioNome
                        }
                    ],
                    "Subject": assunto,
                    "TextPart": "Projeto Integrador",
                    "HTMLPart": `${corpo}`,
                    "CustomID": "Projeto Integrador",
                    "Attachments": [
                        {
                          'ContentType': "application/pdf",
                          'Filename': pdf,
                          'Base64Content':  $pdfBase64,
                        }
                      ],
                }
            ]
        });
    return request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })

}
export default enviarEmail;