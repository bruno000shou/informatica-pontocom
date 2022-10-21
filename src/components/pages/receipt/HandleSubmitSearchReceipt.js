import axios from "axios";

async function HandleSubmitSearchReceipt(
  searchNumberReceipt, // VEM A PESQUISA POR TELEFONE
  searchNameReceipt, // VEM A PESQUISA POR NOME
  setSearchReceiptNameContent, //STATE DE CONTEUDO DE PESQUISA
  setSearchReceiptNumberContent,
  searchReceiptInitDate,
  searchReceiptFinalDate
) {
  let searchNumber = searchNumberReceipt;
  let searchName = searchNameReceipt;
  let searchInitDate = searchReceiptInitDate;
  let searchFinalDate = searchReceiptFinalDate;
  let auxSearch = "";
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

  if (
    (searchName !== "" && searchNumber !== "") ||
    (searchNumber !== "" && searchName === "")
  ) {
    auxSearchByNumberList = [];
    auxSearch.forEach((element) => {
      if (auxSearch[i].number.indexOf(auxNumber) !== -1) {
        auxSearchByNumberList.push(element);
      }
      i = i + 1;
    });
    i = 0;
    console.log("pesquisa feita com elemento numero ");
    // setShowHideSearcPainel(true); SETAR COMO TRUE O STATE QUE FAZ ABRIR O PAINEL DE PESQUISA
    setSearchReceiptNumberContent(auxSearchByNumberList);
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
      // setShowHideSearcPainel(true); COLOCAR AQUI O SET DO STATE QUE ABRE O PAINEL DE PESQUISA
      setSearchReceiptNameContent(auxSearchByNameList);
    }
  }
}

//  else {
//     setHandleSubmitDialog(true);
//     console.log("É necessário preencher um dos métodos de pesquisa");
//   }
//   auxNumber = "";
//   auxName = "";

export default HandleSubmitSearchReceipt;
