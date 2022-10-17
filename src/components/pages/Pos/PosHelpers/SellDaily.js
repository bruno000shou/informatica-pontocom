import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import HelperResetsellstates from "../../../../helpers/HelperResetsellstates";
import Resetsellstates from "./ResetSellStates";

async function SellDaily(
  sellDailyInsertService,
  sellDailyInsertType,
  sellDailyInsertValue,
  sellNow,
  setOpenDialogErroSales,
  payValue,
  setPayValue,
  setSellDailyInsertType,
  setSellDailyInsertService,
  setPayType,
  setService,
  payTypeType,
  servStateType,
  setSellDialog,
  setSellNow,
  setOpenDialogErroSalesButtons
) {
  let varJson;
  let caixaDia;
  let auxService = sellDailyInsertService.substr(10);
  let auxType = sellDailyInsertType.substr(7);
  let auxSend = {
    id: uuidv4(),
    serviceType: auxService,
    payType: auxType,
    value: sellDailyInsertValue,
  };
  await axios.get("http://localhost:5000/dailyList").then((resp) => {
    varJson = resp.data.dailyList;
    caixaDia = resp.data.dailyList.filter((name) => name.openPos === true);
  });
  // VARJSON TEM O CAIXA COMPLETO COM A VENDA INCLUIDA
  // CAIXADIA POSSUI O CAIXA ABERTO MAIS A VENDA INCLUIDA
  if (sellNow.length > 0) {
    caixaDia[0].sales.push(auxSend);
  } else {
    setOpenDialogErroSales(true);
  }

  if (!!caixaDia && caixaDia.length > 0) {
    if (
      payValue.length > 0 &&
      sellDailyInsertService.length > 0 &&
      sellDailyInsertType.length > 0
    ) {
      axios.put("http://localhost:5000/dailyList", varJson);
      console.log("Venda Incluída com sucesso");
      HelperResetsellstates(
        setPayValue,
        setSellDailyInsertType,
        setSellDailyInsertService
      );
      Resetsellstates(setPayType, setService, payTypeType, servStateType);
      setSellDialog(true);
      setSellNow(caixaDia); // ALTERADO AQUI PARA ATUALIZAR O VALOR DO CAIXA DIA
      setSellDailyInsertService("");
      setSellDailyInsertType("");
    } else {
      console.log(
        "Venda não pôde ser concluída. Verifique os botões de controle."
      );
      setOpenDialogErroSalesButtons(true);
    }
  } else {
    setOpenDialogErroSales(true);
    console.log("Não há caixa aberto, precisa abrir um caixa antes");
  }
}

export default SellDaily;
