const ExcelJs = require('exceljs');

async function excelTest(){
    let output = {row:-1,col:-1};
    const workbook = new ExcelJs.Workbook();
    await   workbook.xlsx.readFile('E:/Downloads/excelDownload.xlsx');
    const worksheet = workbook.getWorksheet('Sheet1');
    worksheet.eachRow((row,rowNumber)=>{
        row.eachCell((cell, colNumber)=>{
            if(cell.value==='Banana'){
                output.row = rowNumber;
                output.col = colNumber;
            }
        })
    })
    const cells = worksheet.getCell(output.row,output.col); // it prints the value of row 3 and cell 2 
    cells.value='Apple'; // it changes the value of row 3 and cell 2 to IPhone
    
    await workbook.xlsx.writeFile('E:/Downloads/excelDownload.xlsx'); // it saves the changes to the same file
}     
excelTest();

