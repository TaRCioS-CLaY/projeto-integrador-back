import fs from 'fs';
import moment from 'moment';
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

const gerarPdf = (beneficiario, despesas) => {
    // console.log('Beneficiario: ', beneficiario);
    if(!despesas){
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
                        `Médico:............${e.ds_credenciado}\n\n\n`,
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
                style:'totais fonte'.split(' '),
            }
        ],
    }
console.log(docDefinition);
    let pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream(`./despesasmedicas${beneficiario.nr_matricula}.pdf`));
    pdfDoc.end();
}
export default gerarPdf;