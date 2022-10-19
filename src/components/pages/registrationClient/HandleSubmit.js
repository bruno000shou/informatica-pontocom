import axios from "axios";
import { v4 as uuidv4 } from "uuid";

async function HandleSubmit(
  setHandleBox,
  setHandleName,
  setHandleTel1,
  setHandleTel2,
  setHandleExtra,
  handleName,
  handleTel1,
  handleTel2,
  handleExtra,
  handleBox,
  setHandleSubmitDialog
) {
  const postModel = {
    name: "",
    tel1: 0,
    tel2: 0,
    extra: "teste",
    whatsapp: false,
    id: uuidv4(),
  };
  let auxPost = postModel;
  auxPost.name = handleName;
  auxPost.tel1 = handleTel1;
  auxPost.tel2 = handleTel2;
  auxPost.extra = handleExtra;
  auxPost.whatsapp = handleBox;
  let varJson;

  if (handleName !== "" && handleTel1 !== "") {
    await axios
      .get("http://localhost:5000/regClient")
      .then((resp) => {
        varJson = resp.data.regClient;
      })
      .catch((err) => console.log(err));

    let splitPostName = auxPost.name.split(" ");
    for (let i = 0; i < splitPostName.length; i++) {
      splitPostName[i] =
        splitPostName[i][0].toUpperCase() + splitPostName[i].substr(1);
    }

    console.log(auxPost);

    let joinPosName = "";
    splitPostName.map((word) => (joinPosName += ` ${word}`));
    auxPost.name = joinPosName;

    varJson.push(auxPost);

    varJson.sort(function(x, y) {
      let a = x.name.toUpperCase();
      let b = y.name.toUpperCase();
      return a === b ? 0 : a > b ? 1 : -1;
    });

    axios
      .put("http://localhost:5000/regClient", varJson)
      .then(console.log("Cadastro do cliente feito com sucesso"))
      .catch((err) => console.log(err));
    window.location.reload();
  } else {
    setHandleSubmitDialog(true);
    console.log("O nome do cliente e telefone 1 sao obrigatórios");
  }
  setHandleBox(false);
  setHandleName("");
  setHandleTel1("");
  setHandleTel2("");
  setHandleExtra("");
}

export default HandleSubmit;
