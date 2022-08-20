import axios from "axios";

async function HandleSaveDataClient(
  clientCheckEditBox,
  clientEditExtra,
  clientEditTel2,
  clientEditTel1,
  clientEditName,
  clienteEditId
) {
  let allContentJson;

  await axios.get("http://localhost:5000/regClient").then((resp) => {
    allContentJson = resp.data.regClient;
  });

  let foundElementToUpdate = allContentJson.find(
    (found) => found.id === clienteEditId
  );
  foundElementToUpdate = {
    name: clientEditName,
    tel1: clientEditTel1,
    tel2: clientEditTel2,
    extra: clientEditExtra,
    whatsapp: clientCheckEditBox,
    id: clienteEditId,
  };

  let i = 0;
  allContentJson.forEach((element) => {
    if (element.id === foundElementToUpdate.id) {
      allContentJson[i] = foundElementToUpdate;
    }
    i++;
  });

  axios
    .put("http://localhost:5000/regClient", allContentJson)
    .catch((err) => console.log(err));
}
export default HandleSaveDataClient;
