import fs from 'fs';
const pdf2base64 = require('pdf-to-base64');
const apikey = process.env.MAILJETKEY;
const apiSecret = process.env.MAILJETSECRET;
const mailjet = require('node-mailjet')
    .connect('ea97a87db1f29295a3c637eb03455d8f', '30a71e58a1f0a180815636fb29903c52');
// .connect('apiKey', 'apiSecret');

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
const enviarEmail = async (destinatarioEmail, destinatarioNome, assunto, corpo, remetenteEmail = 'email', remetenteNome = 'nome', pdf = null) => {
//   console.log('PDF Chegando: ', pdf);
    let objetoEmail = {
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
                "Attachments": [],
            }
        ]
    }

    if(pdf !== null){
                objetoEmail.Messages[0].Attachments.push({
                    'ContentType': "application/pdf",
                    'Filename': 'relatorio.pdf',
                    'Base64Content': pdf,
                }) 
            const request = mailjet
            .post("send", { 'version': 'v3.1' })
            .request(objetoEmail);
        return request
            .then((result) => {
                console.log(result.body)
            })
            .catch((err) => {
                console.log(err.statusCode)
            })
    }
    
    const request = mailjet
        .post("send", { 'version': 'v3.1' })
        .request(objetoEmail);
    return request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })

}
export default enviarEmail;