import fs from 'fs';
import moment from 'moment';
let pdfBase64 = null;
const fonts = {
    Roboto: {
        normal: 'node_modules/roboto-font/fonts/Roboto/roboto-regular-webfont.ttf',
        bold: 'node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf',
        italics: 'node_modules/roboto-font/fonts/Roboto/roboto-italic-webfont.ttf',
        bolditalics: 'node_modules/roboto-font/fonts/Roboto/roboto-bolditalic-webfont.ttf'
    }
};
const PdfPrinter = require('pdfmake');
const printer = new PdfPrinter(fonts);

export const gerarPdfBeneficiario = (beneficiario, despesas) => {
    return new Promise((resolve, reject) => {
        if (!despesas.length) {
            return;
        }
        let docDefinition = {
            content: [
                {
                    text: 'Demonstrativo Mensal de Despesas Médicas',
                    style: 'header',
                    alignment: 'center'
                },
                {
                    text: `${beneficiario.nm_beneficiario} – Carteirinha ${beneficiario.nr_matricula}\n\n\n\n\n`,
                    style: 'subheader',
                    alignment: 'center'
                },
                ...despesas.map((e) => ({
                    text: [
                        `Médico: ............${e.ds_credenciado}\n\n\n`,
                        `Data: ...............${moment(e.dt_atendimento).format('DD/MM/YYYY')}\n\n\n`,
                        `Procedimento: ................${e.ds_procedimento}\n\n\n`,
                        `Descrição do Procedimento: ..................${e.descricaoProcedimento}\n\n\n`,
                        `Valor do Procedimento: R$ ${e.vl_procedimento}\n\n\n\n`,
                        '----------------------------------------------------------------------------------------------------------------------------------------------------------\n\n\n'
                    ],
                    style: 'fonte'
                })
                ),
                {
                    text: [
                        `Total de procedimentos: ${despesas.length}\n`,
                        `Total a receber: R$ ${(despesas.reduce((acc, e) => acc + e.vl_procedimento, 0)).toFixed(2)}`
                    ],
                    style: 'totais fonte'.split(' '),
                }
            ],
        }
        let pdfDoc = printer.createPdfKitDocument(docDefinition);
        pdfDoc.pipe(fs.createWriteStream(`./src/pdfs/despesasmedicas${beneficiario.nr_matricula}.pdf`).on('finish', () => {
            resolve(fs.readFileSync(`./src/pdfs/despesasmedicas${beneficiario.nr_matricula}.pdf`, { encoding: "base64" }))
        }));
        pdfDoc.end();
    })
}
export const gerarPdfCredenciado = (credenciado, atendimentos) => {
    return new Promise((resolve, reject) => {
        if (!atendimentos.length) {
            return;
        }
        let docDefinition = {
            content: [
                {
                    text: 'Demonstrativo Mensal de Serviços Médicos',
                    style: 'header',
                    alignment: 'center'
                },
                {
                    text: `${credenciado.ds_credenciado} – ${credenciado.ds_especialidade} CRM ${credenciado.crm}\n\n\n\n\n`,
                    style: 'subheader',
                    alignment: 'center'
                },
                ...atendimentos.map((e) => ({
                    text: [
                        `Beneficiário atendido: ............${e.nm_beneficiario}\n\n\n`,
                        `Data: ...............${moment(e.dt_atendimento).format('DD/MM/YYYY')}\n\n\n`,
                        `Procedimento: ................${e.ds_procedimento}\n\n\n`,
                        `Descrição do Procedimento: ..................${e.descricaoProcedimento}\n\n\n`,
                        `Valor do Procedimento: R$ ${e.vl_procedimento}\n\n\n\n`,
                        '----------------------------------------------------------------------------------------------------------------------------------------------------------\n\n\n'
                    ],
                    style: 'fonte'
                })
                ),
                {
                    text: [
                        `Total de procedimentos: ${atendimentos.length}\n`,
                        `Total a receber: R$ ${(atendimentos.reduce((acc, e) => acc + e.vl_procedimento, 0)).toFixed(2)}`
                    ],
                    style: 'totais fonte'.split(' '),
                }
            ],
        }
        let pdfDoc = printer.createPdfKitDocument(docDefinition);
        pdfDoc.pipe(fs.createWriteStream(`./src/pdfs/atendimentos${credenciado.cd_credenciado}.pdf`).on('finish', () => {
            resolve(fs.readFileSync(`./src/pdfs/atendimentos${credenciado.cd_credenciado}.pdf`, { encoding: "base64" }));
        }));
        pdfDoc.end();
    })
}
