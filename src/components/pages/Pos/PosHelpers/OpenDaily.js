import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import GetOnLoad from "./GetOnLoad";

async function OpenDaily(
  setOpenDialogAlready,
  setOpenDialog,
  setSellNow,
  setUpdateJson,
  takeDateNow
) {
  let caixaDia;
  await axios
    .get("http://localhost:5000/dailyList")
    .then((resp) => {
      caixaDia = resp.data.dailyList.filter((name) => name.openPos === true);
    })
    .catch((erro) => {
      console.log(erro);
    });
  if (caixaDia.length > 0) {
    console.log("Ja tem caixa aberto");
    setOpenDialogAlready(true);
  } else {
    await axios.post("http://localhost:5000/dailyList", {
      id: uuidv4(),
      datePos: takeDateNow,
      openPos: true,
      sales: [],
    });
    console.log("Abrindo caixa caixa");
    GetOnLoad(setUpdateJson, setSellNow);
    setOpenDialog(true);
  }
  setSellNow(caixaDia);
}

export default OpenDaily;
