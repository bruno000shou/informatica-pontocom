import styles from "./HomeClient.module.css";
import InputRegClient from "../../templates/InputRegClient";
import ButtonGeneric from "../../templates/ButtonSave";
import TextArea from "../../templates/TextArea";
import React, { useState } from "react";
import axios from "axios";

function HomeClient() {
  const [handleName, setHandleName] = useState();
  const [handleTel1, setHandleTel1] = useState();
  const [handleTel2, setHandleTel2] = useState();
  const [handleExtra, setHandleExtra] = useState("");
  const [handleBox, setHandleBox] = useState(false);
  const [handlePost, setHandlePos] = useState([]);

  const postModel = {
    name: "",
    tel1: 0,
    tel2: 0,
    extra: "teste",
    whatsapp: false,
  };
  function handleChangeName(e) {
    setHandleName(e);
  }

  function handleChangeTel1(e) {
    setHandleTel1(e);
  }

  function handleChangeTel2(e) {
    setHandleTel2(e);
  }

  function handleChangeExtra(e) {
    setHandleExtra(e.target.value);
  }

  function handleChangeBox() {
    if (handleBox === false) {
      setHandleBox(true);
    } else {
      setHandleBox(false);
    }
  }

  async function handleSubmit(e) {
    let auxPost = postModel;
    auxPost.name = handleName;
    auxPost.tel1 = handleTel1;
    auxPost.tel2 = handleTel2;
    auxPost.extra = handleExtra;
    auxPost.whatsapp = handleBox;

    let varJson;

    await axios.get("http://localhost:5000/regClient").then((resp) => {
      varJson = resp.data.regClient;
    });

    varJson.push(auxPost);
    console.log(varJson);
  }

  return (
    <div className={styles.containerHome}>
      <div id="form1" className={styles.divFormStyles}>
        <form>
          <div className={styles.divH2Styles}>
            <h2>Cadastro de clientes</h2>
          </div>
          <div>
            <InputRegClient
              type={"text"}
              placeholder={"Digite o nome aqui"}
              textLabel={"Nome"}
              name={"nome"}
              makeChange={handleChangeName}
            />
          </div>
          <div>
            <InputRegClient
              type={"number"}
              placeholder={"Digite o telefone(1) aqui"}
              textLabel={"Telefone(1)"}
              name={"telefone1"}
              makeChange={handleChangeTel1}
            />
          </div>
          <div>
            <InputRegClient
              type={"number"}
              placeholder={"Digite o telefone(2) aqui"}
              textLabel={"Telefone(2)"}
              name={"telefone2"}
              makeChange={handleChangeTel2}
            />
          </div>
          <div>
            <TextArea
              placeholder={"Digite aqui informações extras"}
              textLabel={"Extras:"}
              type={"text"}
              name={"observacao"}
              rows={"10"}
              cols={"75"}
              onChange={handleChangeExtra}
            />
          </div>
          <div className={styles.checkWhatsapp}>
            <InputRegClient
              type={"checkbox"}
              textLabel={"Esse cliente tem whatsapp?"}
              name={"whatsapp"}
              makeChange={handleChangeBox}
            />
          </div>
          <div className={styles.buttonStyles}>
            <ButtonGeneric
              type={"button"}
              textButton={"Salvar Cadastro"}
              colorBg={"colorBgSave"}
              colorText={"colorTextSave"}
              eClick={handleSubmit}
            />
            <ButtonGeneric
              type={"reset"}
              textButton={"Limpar dados"}
              colorBg={"colorBgReset"}
              colorText={"colorTextReset"}
            />
          </div>
        </form>
      </div>
      <div id="form2" className={styles.divFormStyles}>
        <form>
          <div className={styles.divH2Styles}>
            <h2>Pesquisar Clientes</h2>
          </div>
          <div>
            <InputRegClient
              type={"text"}
              placeholder={"Digite o nome aqui"}
              textLabel={"Por nome"}
              name={"nome"}
            />
          </div>
          <div>
            <InputRegClient
              type={"number"}
              placeholder={"Digite o telefone aqui"}
              textLabel={"Por telefone"}
              name={"telefone"}
            />
          </div>
          <div className={styles.buttonStyles}>
            <ButtonGeneric
              type={"button"}
              textButton={"Pesquisar"}
              colorBg={"colorBgSave"}
              colorText={"colorTextSave"}
            />
            <ButtonGeneric
              type={"reset"}
              textButton={"Limpar consulta"}
              colorBg={"colorBgReset"}
              colorText={"colorTextReset"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default HomeClient;
