const ExcelJs = require("exceljs");

let output = { row: -1, col: -1 };
async function writeExcelTest(searchText, filePath, replaceText) {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet("Sheet1");
  await readExcel(worksheet, searchText);
  const cells = worksheet.getCell(output.row, output.col); // it prints the value of row 3 and cell 2
  cells.value = replaceText; // it changes the value of row 3 and cell 2 to IPhone
    const priceChange = worksheet.getCell(output.row,output.col+2);
    priceChange.value=350;

  await workbook.xlsx.writeFile(filePath); // it saves the changes to the same file
}

async function readExcel(worksheet, searchText) {
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output.row = rowNumber;
        output.col = colNumber;
      }
    });
  });
}
writeExcelTest("Pineapple", "E:/Downloads/excelDownload.xlsx", "Mango");

//update Mango to 350