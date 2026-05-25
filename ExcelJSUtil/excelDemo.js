const ExcelJs = require('exceljs');

async function excelTest(){

    const workbook = new ExcelJs.Workbook();
    await   workbook.xlsx.readFile('E:/Downloads/excelDownload.xlsx');
    const worksheet = workbook.getWorksheet('Sheet1');
    worksheet.eachRow((row,rowNumber)=>{
        row.eachCell((cell, colNumber)=>{
            console.log(`Row ${rowNumber} Cell ${colNumber} = ${cell.value}`);
        })
    })
}
excelTest();