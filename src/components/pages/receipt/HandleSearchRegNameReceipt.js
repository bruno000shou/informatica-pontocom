import axios from "axios";

async function HandleSearchRegNameReceipt(
  selectNameReceipt,
  setSearchReceiptComplete,
  setShowDialogEmptySearch
) {
  let searchName = selectNameReceipt;
  let auxSearch = [];
  let auxSearchByNameList = [];
  let i = 0;
  let auxName = searchName;

  await axios
    .get("http://localhost:5000/regClient")
    .then((resp) => {
      auxSearch = resp.data.regClient;
    })
    .catch((err) => console.log(err));

  function ordenateGrow(element) {
    element.sort(function(x, y) {
      return x.number - y.number;
    });
  }

  if (auxSearch && auxSearch.length > 0 && auxName.length > 0) {
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
    ordenateGrow(auxSearchByNameList);
    setSearchReceiptComplete(auxSearchByNameList);
    if (auxSearchByNameList.length === 0) {
      setShowDialogEmptySearch(true);
    }
  }
}

export default HandleSearchRegNameReceipt;
