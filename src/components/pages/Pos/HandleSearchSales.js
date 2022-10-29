import moment from "moment";

import handleReset from "./PosHelpers/HandleReset";
import findBetween from "../../../helpers/FindBetween";

function HandleSearchSales(
  initDate,
  finalDate,
  setSearchFailInit,
  setInitDate,
  setFinalDate,
  setSearchFailFinal,
  setSearchFailInitBigFinal,
  allJson,
  setSearchComplete,
  setShowSearch
) {
  if (initDate === "" && finalDate !== "") {
    console.log("Nao foi escolhida  uma data inicial");
    setSearchFailInit(true);
    handleReset(setInitDate, setFinalDate);
  } else if (finalDate === "" && initDate !== "") {
    console.log("Nao foi escolhida uma data final");
    setSearchFailFinal(true);
    handleReset(setInitDate, setFinalDate);
  } else if (finalDate === "" && initDate === "") {
    setSearchFailFinal(true);
    console.log(
      "Nenhuma data foi escolhida, escolha as datas e refaça a pesquisa"
    );
    handleReset(setInitDate, setFinalDate);
  } else if (initDate > finalDate) {
    setSearchFailInitBigFinal(true);
    console.log(
      "A data inicial e mais recente que a data final, refaça a pesquisa"
    );
    handleReset(setInitDate, setFinalDate);
  } else {
    console.log("Pesquisa feita com sucesso");
    findBetween(
      allJson,
      moment(initDate).format("YYYYMMDD"),
      moment(finalDate).format("YYYYMMDD"),
      setSearchComplete
    );
    setShowSearch(2);
    handleReset(setInitDate, setFinalDate);
  }
  handleReset(setInitDate, setFinalDate);
}

export default HandleSearchSales;
