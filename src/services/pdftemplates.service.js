import fs from 'fs';
const fonts = {
    Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    }
};
const PdfPrinter = require('pdfmake');
const printer = new PdfPrinter(fonts);

export const gerarPdf = (beneficiario, despesas) => {
    let docDefinition = {
        content: [
            {
                text: 'Demonstrativo Mensal de Despesas Médicas',
                style: 'header',
                alignment: 'center'
            },
            {
                text: `${beneficiario.nome} – Carteirinha ${beneficiario.nr_matricula}\n\n\n\n\n`,
                style: 'subheader',
                alignment: 'center'
            },
            ...despesas.map((e) => ({
                    text: [
                        `Médico:............${e.credenciado}\n\n\n`,
                        `Data: ...............${e.data}\n\n\n`,
                        `Procedimento: ................${e.procedimento}\n\n\n`,
                        `Descrição do Procedimento: ..................${e.descricaoProcedimento}\n\n\n`,
                        `Valor do Procedimento: R$ ${e.valor}\n\n\n\n`,
                        '----------------------------------------------------------------------------------------------------------------------------------------------------------\n\n\n'
                    ],
                    style: 'fonte'
            })
            ),
            {
                text: [
                    `Total de procedimentos: ${despesas.length}`,
                    `Total a receber: R$ ${despesas.reduce((acc, e) => acc + e.valor, 0)}`
                ],
                style:'totais fonte'.split(' '),
            }
        ],
    }

    let pdfDoc = printer.createPdfKitDocument(docDefinition, options);
    pdfDoc.pipe(fs.createWriteStream('./despesasmedicas.pdf'));
    pdfDoc.end();
}
