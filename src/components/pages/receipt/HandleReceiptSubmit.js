import { v4 as uuidv4 } from "uuid";
import axios from "axios";

async function HandleReceiptSubmit(
  nameReceipt,
  valorReceipt,
  equipReceipt,
  serviceReceipt,
  osReceipt,
  // setServiceReceipt,
  // setEquipReceipt,
  // setValorReceipt,
  // setNameReceipt,
  // setOsReceipt,
  setNumberReceipt
) {
  let auxPutReceipt = {
    name: nameReceipt,
    valor: valorReceipt,
    equip: equipReceipt,
    service: serviceReceipt,
    id: uuidv4(),
    date: dateNowDone,
    os: osReceipt,
    number: 0,
  };
  let varJsonReceipt;

  let dateNow = new Date();
  let dia = String(dateNow.getDate()).padStart(2, "0");
  let mes = String(dateNow.getMonth() + 1).padStart(2, "0");
  let ano = dateNow.getFullYear();
  let dateNowDone = ano + mes + dia;

  if (
    nameReceipt !== "" &&
    valorReceipt !== "" &&
    equipReceipt !== "" &&
    serviceReceipt !== ""
  ) {
    await axios
      .get("http://localhost:5000/receipt")
      .then((resp) => {
        varJsonReceipt = resp.data.receipt;
      })
      .catch((err) => console.log(err));

    let splitReceiptName = auxPutReceipt.name.split(" ");
    for (let i = 0; i < splitReceiptName.length; i++) {
      splitReceiptName[i] =
        splitReceiptName[i][0].toUpperCase() + splitReceiptName[i].substr(1);
    }
    let joinReceiptName = "";
    splitReceiptName.map((word) => (joinReceiptName += ` ${word}`));
    auxPutReceipt.name = joinReceiptName;

    let maxValue = 0;

    varJsonReceipt.map((current) => {
      maxValue = current.number > maxValue ? current.number : maxValue;
    });

    maxValue = maxValue + 1;
    auxPutReceipt.date = dateNowDone;
    auxPutReceipt.number = maxValue;
    setNumberReceipt(maxValue);
    console.log(maxValue);

    varJsonReceipt.push(auxPutReceipt);

    varJsonReceipt.sort(function(x, y) {
      let a = x.name.toUpperCase();
      let b = y.name.toUpperCase();
      return a === b ? 0 : a > b ? 1 : -1;
    });
    axios
      .put("http://localhost:5000/receipt", varJsonReceipt)
      .then(console.log("Cadastro do cliente feito com sucesso"))
      .catch((err) => console.log(err));
  } else {
    console.log(
      "É necessário preencher todos os dados do recibo antes de concluir"
    );
  }
}

export default HandleReceiptSubmit;
