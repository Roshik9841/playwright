import {test,expect} from "@playwright/test";
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


//update Mango to 350

test("@Web Upload download excel validation",async({page})=>{
  
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
   const downloadPromise =  page.waitForEvent('download'); // it waits for the download to complete
    await page.getByRole("button",{name:"Download"}).click();

    const download = await downloadPromise;
    await download.saveAs("E:/Downloads/download.xlsx"); // save the downloaded file
    await writeExcelTest("Mango", "E:/Downloads/download.xlsx", "Pineapple");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("E:/Downloads/download.xlsx"); // it will upload the file to the website
    const textLocator = page.getByText("Pineapple");
     const desiredRow = await page.getByRole('row').filter({has: textLocator});
     const cellContent = await desiredRow.locator("#cell-4-undefined").textContent();
     console.log(cellContent);
    

    
})