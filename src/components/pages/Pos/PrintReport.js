import { jsPDF } from "jspdf";

function PrintReport(printSuportData) {
  if (printSuportData !== undefined) {
    let money = parseInt(printSuportData[0]);
    let allDevMoney = parseInt(printSuportData[6]);
    let auxMoney = money - allDevMoney;
    let allMoney = auxMoney.toString();

    let credit = parseInt(printSuportData[2]);
    let allDevCredit = parseInt(printSuportData[8]);
    let auxCredit = credit - allDevCredit;
    let allCredit = auxCredit.toString();

    let debit = parseInt(printSuportData[1]);
    let allDevDebit = parseInt(printSuportData[7]);
    let auxDebit = debit - allDevDebit;
    let allDebit = auxDebit.toString();

    let pix = parseInt(printSuportData[3]);
    let allDevPix = parseInt(printSuportData[7]);
    let auxPix = pix - allDevPix;
    let allPix = auxPix.toString();

    let all = parseInt(printSuportData[4]);
    let allDev = printSuportData[9].toString();

    var doc = new jsPDF();
    doc.setFontSize(25);
    doc.setFont("helvetica", "bold");
    doc.text("Caixa do Dia", 20, 20);
    // doc.text("22/22/2222", 40, 20);

    doc.line(20, 25, 190, 25, null);

    doc.setFontSize(20);
    doc.setFont("times", "normal");
    doc.text("Valor total líquido dinheiro:", 20, 40);
    doc.text("R$" + allMoney, 170, 40);
    doc.setFontSize(10);
    doc.setFont("times", "normal");
    doc.text("Devolução total dinheiro:", 20, 45);
    doc.text("R$" + allDevMoney, 170, 45);
    doc.setFontSize(10);
    doc.setFont("times", "normal");
    doc.text("Valor total bruto dinheiro:", 20, 50);
    doc.text("R$" + money, 170, 50);

    doc.line(20, 65, 190, 65, null);

    doc.setFontSize(20);
    doc.setFont("times", "normal");
    doc.text("Valor total líquido crédito:", 20, 80);
    doc.text("R$" + allCredit, 170, 80);
    doc.setFontSize(10);
    doc.setFont("times", "normal");
    doc.text("Devolução total crédito:", 20, 85);
    doc.text("R$" + allDevCredit, 170, 85);
    doc.setFontSize(10);
    doc.setFont("times", "normal");
    doc.text("Valor total bruto crédito:", 20, 90);
    doc.text("R$" + credit, 170, 90);

    doc.line(20, 105, 190, 105, null);

    doc.setFontSize(20);
    doc.setFont("times", "normal");
    doc.text("Valor total para débito:", 20, 120);
    doc.text("R$" + allDebit, 170, 120);
    doc.setFontSize(10);
    doc.setFont("times", "normal");
    doc.text("Devolução total débito:", 20, 125);
    doc.text("R$" + allDevDebit, 170, 125);
    doc.setFontSize(10);
    doc.setFont("times", "normal");
    doc.text("Valor total bruto débito:", 20, 130);
    doc.text("R$" + debit, 170, 130);

    doc.line(20, 145, 190, 145, null);

    doc.setFontSize(20);
    doc.setFont("times", "normal");
    doc.text("Valor total para pix:", 20, 160);
    doc.text("R$" + allPix, 170, 160);
    doc.setFontSize(10);
    doc.setFont("times", "normal");
    doc.text("Devolução total pix:", 20, 165);
    doc.text("R$" + allDevDebit, 170, 165);
    doc.setFontSize(10);
    doc.setFont("times", "normal");
    doc.text("Valor total bruto pix:", 20, 170);
    doc.text("R$" + pix, 170, 170);

    doc.line(20, 185, 190, 185, null);

    doc.setFontSize(20);
    doc.setFont("times", "normal");
    doc.text("Valor total para devolução:", 20, 200);
    doc.text("R$" + allDev, 170, 200);
    doc.line(20, 215, 190, 215, null);
    doc.setFontSize(20);
    doc.setFont("times", "normal");
    doc.text("Valor total do caixa:", 20, 230);
    doc.text("R$" + all, 170, 230);

    doc.save("CaixaDia.pdf");
  } else {
    console.log("caixa do dia vazio");
  }
}

export default PrintReport;
