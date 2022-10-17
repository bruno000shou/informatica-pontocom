import axios from "axios";

async function GetOnLoad(setUpdateJson, setSellNow) {
  let caixaDia;
  await axios
    .get("http://localhost:5000/dailyList")
    .then((resp) => {
      setUpdateJson(resp.data.dailyList);
      caixaDia = resp.data.dailyList.filter((name) => name.openPos === true);
      setSellNow(caixaDia);
    })
    .catch((erro) => {
      console.log(erro);
    });
}

export default GetOnLoad;
