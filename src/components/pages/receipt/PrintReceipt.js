import { jsPDF } from "jspdf";

function PrintReceipt(
  nameReceipt,
  valorReceipt,
  equipReceipt,
  serviceReceipt,
  osReceipt,
  numberReceipt
) {
  if (
    nameReceipt.length > 0 &&
    valorReceipt.length > 0 &&
    equipReceipt.length > 0 &&
    serviceReceipt.length > 0
  ) {
    numberReceipt = numberReceipt.toString();

    let dateNow = new Date();
    let dia = String(dateNow.getDate()).padStart(2, "0");
    let mes = String(dateNow.getMonth()).padStart(1, "0");
    let ano = dateNow.getFullYear();
    let meses = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    let splitReceiptName = nameReceipt.split(" ");
    for (let i = 0; i < splitReceiptName.length; i++) {
      splitReceiptName[i] =
        splitReceiptName[i][0].toUpperCase() + splitReceiptName[i].substr(1);
    }
    let joinReceiptName = "";
    splitReceiptName.map((word) => (joinReceiptName += ` ${word}`));
    nameReceipt = joinReceiptName;

    let breakServiceLines = [];
    if (serviceReceipt.length > 63) {
      breakServiceLines[0] = serviceReceipt.slice(0, 63);
      console.log("if de ate 63 passou");
      if (serviceReceipt.length > 127) {
        breakServiceLines[1] = serviceReceipt.slice(64, 127);
        console.log("if de ate  127 passou");
        if (serviceReceipt.length > 191) {
          breakServiceLines[2] = serviceReceipt.slice(128, 191);
          breakServiceLines[3] = serviceReceipt.slice(192);
          console.log("if de ate 200 passou");
        }
      } else {
        breakServiceLines[1] = serviceReceipt.slice(64);
      }
    } else {
      breakServiceLines.push(serviceReceipt);
    }

    var doc = new jsPDF();
    doc.setFontSize(22);
    doc.setFont("times", "bold");
    doc.text("Informática.Com", 76, 20);
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      "Rua Barão do Bom Retiro, nº 522. Engenho Novo - Rio de Janeiro - RJ",
      48,
      25
    );
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text("CEP: 20715-003 - Telefone: 25010572 (whatsapp)", 64, 30);
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text("Cnpj: 11.936.676/0001-08", 84, 35);

    doc.setFontSize(20);
    doc.setFont("times", "bold");
    doc.text("Recibo Nº ", 82, 50);

    doc.setFontSize(18);
    doc.setFont("times", "bold");
    doc.text(numberReceipt, 113, 50);

    doc.setFontSize(13);
    doc.setFont("times", "bold");
    doc.text("Ordem de serviço nº: ", 20, 60);
    doc.setFontSize(11);
    doc.setFont("times", "normal");
    doc.text(osReceipt, 63, 60);

    doc.setFontSize(13);
    doc.setFont("times", "bold");
    doc.text("A quantida de  R$", 135, 60);
    doc.setFontSize(11);
    doc.setFont("times", "normal");
    doc.text(valorReceipt, 173, 60);

    doc.setFontSize(13);
    doc.setFont("times", "bold");
    doc.text("Prazo de garantia: 3 meses", 134, 67);

    doc.setFontSize(13);
    doc.setFont("times", "bold");
    doc.text("Recebemos do Sr.(a): ", 20, 67);
    doc.setFontSize(11);
    doc.setFont("times", "normal");
    doc.text(nameReceipt, 64, 67);

    doc.setFontSize(13);
    doc.setFont("times", "bold");
    doc.text("Referente ao equipamento: ", 20, 74);
    doc.setFontSize(11);
    doc.setFont("times", "normal");
    doc.text(equipReceipt, 75, 74);

    doc.setFontSize(13);
    doc.setFont("times", "bold");
    doc.text("Referente ao serviço: ", 20, 81);
    doc.setFontSize(11);
    doc.setFont("times", "normal");
    doc.text(breakServiceLines, 63, 81);

    doc.setFontSize(13);
    doc.setFont("times", "normal");
    doc.text("E para clareza, firmamos o presente,", 20, 102);

    doc.setFontSize(13);
    doc.setFont("times", "normal");
    doc.text("Rio de Janeiro", 108, 102);
    doc.text(`${dia}, de ${meses[mes]}, de ${ano}`, 140, 102);

    doc.setFontSize(8);
    doc.setFont("times", "bold");
    doc.text(
      "Essa  garantia se refere  somente  ao  serviço  descrito e ao  equipamento  indicado neste recibo, não sendo de responsabilidade da empresa outros",
      17,
      110
    );

    doc.setFontSize(8);
    doc.setFont("times", "bold");
    doc.text(
      "danos  ou   defeitos apresentados  pelo  equipamento,  que  não  posuem  relação  com  o  serviço  garatido  por  esta  recibo.  Essa  garantia  ficará",
      17,
      113
    );

    doc.setFontSize(8);
    doc.setFont("times", "bold");
    doc.text(
      "automaticamente  cancelada se  os equipamentos  vierem  a  sofrer reparos  por  pessoas  não autorizadas,  receber  maus  tratos  ou  sofrer  danos",
      17,
      116
    );

    doc.setFontSize(8);
    doc.setFont("times", "bold");
    doc.text(
      "decorrentes  de  acidentes, quedas, variações de  tensão  elétrica,  vírus,  ou  qualquer  ocorrência imprevisível,  decorrentes  de má  utilização  dos",
      17,
      119
    );

    doc.setFontSize(8);
    doc.setFont("times", "bold");
    doc.text("equipamentos por parte do usuário.", 17, 122);

    doc.line(62, 130, 150, 130, null);

    doc.setFontSize(13);
    doc.setFont("times", "bold");
    doc.text("Informática.com", 88, 135);

    doc.line(20, 145, 190, 145, null);

    doc.setFontSize(22);
    doc.setFont("times", "bold");
    doc.text("Informática.Com", 76, 160);
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      "Rua Barão do Bom Retiro, nº 522. Engenho Novo - Rio de Janeiro - RJ",
      48,
      165
    );
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text("CEP: 20715-003 - Telefone: 25010572 (whatsapp)", 64, 170);
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text("Cnpj: 11.936.676/0001-08", 84, 175);

    doc.setFontSize(20);
    doc.setFont("times", "bold");
    doc.text("Recibo Nº ", 82, 190);

    doc.setFontSize(18);
    doc.setFont("times", "bold");
    doc.text(numberReceipt, 113, 190);

    doc.setFontSize(13);
    doc.setFont("times", "bold");
    doc.text("Ordem de serviço nº: ", 20, 200);
    doc.setFontSize(11);
    doc.setFont("times", "normal");
    doc.text(osReceipt, 63, 200);

    doc.setFontSize(13);
    doc.setFont("times", "bold");
    doc.text("A quantida de  R$", 135, 200);
    doc.setFontSize(11);
    doc.setFont("times", "normal");
    doc.text(valorReceipt, 173, 200);

    doc.setFontSize(13);
    doc.setFont("times", "bold");
    doc.text("Prazo de garantia: 3 meses", 134, 207);

    doc.setFontSize(13);
    doc.setFont("times", "bold");
    doc.text("Recebemos do Sr.(a): ", 20, 207);
    doc.setFontSize(11);
    doc.setFont("times", "normal");
    doc.text(nameReceipt, 64, 207);

    doc.setFontSize(13);
    doc.setFont("times", "bold");
    doc.text("Referente ao equipamento: ", 20, 214);
    doc.setFontSize(11);
    doc.setFont("times", "normal");
    doc.text(equipReceipt, 75, 214);

    doc.setFontSize(13);
    doc.setFont("times", "bold");
    doc.text("Referente ao serviço: ", 20, 221);
    doc.setFontSize(11);
    doc.setFont("times", "normal");
    doc.text(breakServiceLines, 63, 221);

    doc.setFontSize(13);
    doc.setFont("times", "normal");
    doc.text("E para clareza, firmamos o presente,", 20, 242);

    doc.setFontSize(13);
    doc.setFont("times", "normal");
    doc.text("Rio de Janeiro", 108, 102);
    doc.text(`${dia}, de ${meses[mes]}, de ${ano}`, 140, 242);

    doc.setFontSize(8);
    doc.setFont("times", "bold");
    doc.text(
      "Essa  garantia se refere  somente  ao  serviço  descrito e ao  equipamento  indicado neste recibo, não sendo de responsabilidade da empresa outros",
      17,
      250
    );

    doc.setFontSize(8);
    doc.setFont("times", "bold");
    doc.text(
      "danos  ou   defeitos apresentados  pelo  equipamento,  que  não  posuem  relação  com  o  serviço  garatido  por  esta  recibo.  Essa  garantia  ficará",
      17,
      253
    );

    doc.setFontSize(8);
    doc.setFont("times", "bold");
    doc.text(
      "automaticamente  cancelada se  os equipamentos  vierem  a  sofrer reparos  por  pessoas  não autorizadas,  receber  maus  tratos  ou  sofrer  danos",
      17,
      256
    );

    doc.setFontSize(8);
    doc.setFont("times", "bold");
    doc.text(
      "decorrentes  de  acidentes, quedas, variações de  tensão  elétrica,  vírus,  ou  qualquer  ocorrência imprevisível,  decorrentes  de má  utilização  dos",
      17,
      259
    );

    doc.setFontSize(8);
    doc.setFont("times", "bold");
    doc.text("equipamentos por parte do usuário.", 17, 262);

    doc.line(62, 270, 150, 270, null);

    doc.setFontSize(13);
    doc.setFont("times", "bold");
    doc.text("Informática.com", 88, 275);

    doc.save("CaixaDia.pdf");
  } else {
    console.log("Recibo invalido");
  }
}

export default PrintReceipt;
