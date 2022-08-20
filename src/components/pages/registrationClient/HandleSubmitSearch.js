import axios from "axios";

async function HandleSubmitSearch(
  setSearchName,
  setSearchNumber,
  setSearchByNameNumberList,
  setShowHideSearcPainel,
  searchNumber,
  searchName
) {
  let auxNumber = searchNumber;
  let auxName = searchName;
  let auxSearch = "";
  let auxSearchByNameList = [];
  let auxSearchByNumberList = [];
  let auxSearchByNumberName = [];
  let i = 0;

  await axios
    .get("http://localhost:5000/regClient")
    .then((resp) => {
      auxSearch = resp.data.regClient;
    })
    .catch((err) => console.log(err));

  if (auxName !== "" && auxNumber === "") {
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
    setShowHideSearcPainel(true);
    setSearchByNameNumberList(auxSearchByNameList);
  } else if (auxNumber !== "" && auxName === "") {
    auxSearchByNumberList = [];
    auxSearch.forEach((element) => {
      if (
        auxSearch[i].tel1.indexOf(auxNumber) !== -1 ||
        auxSearch[i].tel2.indexOf(auxNumber) !== -1
      ) {
        auxSearchByNumberList.push(element);
      }
      i = i + 1;
    });
    i = 0;
    console.log("pesquisa feita com elemento numero ");
    setShowHideSearcPainel(true);
    setSearchByNameNumberList(auxSearchByNumberList);
  } else if (auxName !== "" && auxNumber !== "") {
    auxSearch.forEach((element) => {
      if (
        auxSearch[i].name.toUpperCase().indexOf(auxName.toUpperCase()) !== -1
      ) {
        if (
          auxSearch[i].tel1.indexOf(auxNumber) !== -1 ||
          auxSearch[i].tel2.indexOf(auxNumber) !== -1
        ) {
          auxSearchByNumberName.push(element);
        }
      }
      i = i + 1;
    });
    i = 0;
    console.log("pesquisa feita com dois elementos");
    setShowHideSearcPainel(true);
    setSearchByNameNumberList(auxSearchByNumberName);
  } else {
    console.log("É necessário preencher um dos métodos de pesquisa");
  }
  setSearchName("");
  setSearchNumber("");
  auxNumber = "";
  auxName = "";
}

export default HandleSubmitSearch;
