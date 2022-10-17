import axios from "axios";
import GetOnLoad from "./GetOnLoad";

async function CloseDaily(
  sellNow,
  setCloseDialog,
  setCloseDialogAlready,
  setUpdateJson,
  setSellNow
) {
  let varJson;
  await axios
    .get("http://localhost:5000/dailyList")
    .then((resp) => (varJson = resp.data.dailyList))
    .catch((err) => console.log(err));
  let varSellNow = sellNow;
  let varId = "";
  if ((!!varSellNow && varSellNow.length > 0) || varSellNow.openPos === true) {
    varId = varSellNow.find((a) => a);
    varId = varSellNow[0].id;
    varJson.map((item) => {
      if (item.id === varId) item.openPos = false;
      console.log("Caixa fechado com sucesso"); //AQUI SETAMOS FALSE PARA O CAIXA ABERTO
    });
    await axios.put("http://localhost:5000/dailyList", varJson);
    setCloseDialog(true);
  } else {
    console.log("Nao ha caixa aberto. Abra um caixa.");
    setCloseDialogAlready(true);
  }
  GetOnLoad(setUpdateJson, setSellNow);
}

export default CloseDaily;
