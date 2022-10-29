import axios from "axios";
import moment from "moment";

import FindBetweenReceipt from "./receiptHelpers/FindBetweenReceipt";

async function HandleSubmitSearchReceipt(
  searchNumberReceipt,
  searchNameReceipt,
  searchReceiptInitDate,
  searchReceiptFinalDate,
  setSearchReceiptComplete,
  setOpenDialogLessInit,
  setOpenDialogLessFinal,
  setOpenDialogNothing,
  setOpenDialogInitGreaterFinal,
  setOpenPanelReceipt,
  setShowDialogEmptySearch
) {
  let searchNumber = searchNumberReceipt;
  let searchName = searchNameReceipt;
  let searchInitDate = searchReceiptInitDate;
  let searchFinalDate = searchReceiptFinalDate;
  let auxSearch = [];
  let auxSearchByNameList = [];
  let auxSearchByNumberList = [];
  let i = 0;
  let auxName = searchName;
  let auxNumber = searchNumber;

  await axios
    .get("http://localhost:5000/receipt")
    .then((resp) => {
      auxSearch = resp.data.receipt;
    })
    .catch((err) => console.log(err));

  function ordenateGrow(element) {
    element.sort(function(x, y) {
      return x.number - y.number;
    });
  }

  if (
    (searchName !== "" && searchNumber !== "") ||
    (searchNumber !== "" && searchName === "")
  ) {
    auxSearchByNumberList = [];
    auxSearch.forEach((element) => {
      if (auxSearch[i].number.indexOf(auxNumber) !== -1) {
        auxSearchByNumberList.push(element);
        console.log("entrou no if");
      }
      i = i + 1;
    });
    i = 0;
    console.log("pesquisa feita com elemento numero ");
    ordenateGrow(auxSearchByNumberList);
    setSearchReceiptComplete(auxSearchByNumberList);
    setOpenPanelReceipt(true);
  } else if (searchName !== "") {
    if (searchName !== "" && searchNumber === "") {
      auxSearchByNameList = [];
      auxSearch.forEach((element) => {
        if (
          auxSearch[i].name.toUpperCase().indexOf(auxName.toUpperCase()) !== -1
        ) {
          auxSearchByNameList.push(element);
        }
        i = i + 1;
      });
      i = 0;
      console.log("pesquisa feita com elemento nome");
      if (auxSearchByNameList.length === 0) {
        setShowDialogEmptySearch(true);
      }
      ordenateGrow(auxSearchByNameList);
      setSearchReceiptComplete(auxSearchByNameList);
      setOpenPanelReceipt(true);
    }
  } else if (searchInitDate !== "" || searchFinalDate !== "") {
    if (searchInitDate === "" && searchFinalDate !== "") {
      console.log("Nao foi escolhida  uma data inicial");
      setOpenDialogLessInit(true);
    } else if (searchFinalDate === "" && searchInitDate !== "") {
      console.log("Nao foi escolhida uma data final");
      setOpenDialogLessFinal(true);
    } else if (searchInitDate > searchFinalDate) {
      console.log(
        "A data inicial e mais recente que a data final, refaça a pesquisa"
      );
      setOpenDialogInitGreaterFinal(true);
    } else {
      console.log("Pesquisa feita com sucesso");
      setSearchReceiptComplete(
        FindBetweenReceipt(
          auxSearch,
          moment(searchInitDate).format("YYYYMMDD"),
          moment(searchFinalDate).format("YYYYMMDD")
        )
      );
      if (auxSearchByNameList.length === 0) {
        setShowDialogEmptySearch(true);
      }
      setOpenPanelReceipt(true);
    }
  } else {
    console.log("Nenhum metodo de pesquisa foi selecionado");
    setOpenDialogNothing(true);
  }
}

export default HandleSubmitSearchReceipt;
