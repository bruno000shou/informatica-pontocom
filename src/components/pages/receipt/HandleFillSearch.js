import axios from "axios";

async function HandleFillSearch(selectedSearchReceipt, setReturnSearchReceipt) {
  let auxRegClient = [];
  let auxReceipt = [];
  let returnSearch = [];
  let i = 0;
  let auxIdSearch = selectedSearchReceipt;

  await axios
    .get(`http://localhost:5000/regClient`)
    .then((resp) => {
      auxRegClient = resp.data.regClient;
    })
    .catch((err) => console.log(err));

  await axios
    .get(`http://localhost:5000/receipt`)
    .then((resp) => {
      auxReceipt = resp.data.receipt;
    })
    .catch((err) => console.log(err));

  auxRegClient.forEach((element) => {
    if (auxRegClient[i].id === selectedSearchReceipt) {
      returnSearch.push(element);
    }
    i = i + 1;
  });
  i = 0;

  auxReceipt.forEach((element) => {
    if (auxReceipt[i].id === selectedSearchReceipt) {
      returnSearch.push(element);
    }
    i = i + 1;
  });
  i = 0;

  await setReturnSearchReceipt(returnSearch);
}

export default HandleFillSearch;
