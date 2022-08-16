import styles from "./HomeClient.module.css";
import InputRegClient from "../../templates/InputRegClient";
import ButtonGeneric from "../../templates/ButtonGeneric";
import TextArea from "../../templates/TextArea";
import React, { useState } from "react";
import axios from "axios";
import HandleSubmitSearch from "./HandleSubmitSearch";
import HandleSubmit from "./HandleSubmit";

function HomeClient() {
  const [showHideSearch, setShowHideSearch] = useState(false);
  const [handleName, setHandleName] = useState("");
  const [handleTel1, setHandleTel1] = useState("");
  const [handleTel2, setHandleTel2] = useState("");
  const [handleExtra, setHandleExtra] = useState("");
  const [handleBox, setHandleBox] = useState(false);
  const [searchNumber, setSearchNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchByNameList, setSearchByNameList] = useState([]);
  const [searchByNumberList, setSearchByNumberList] = useState([]);
  const [searchByNameNumberList, setSearchByNameNumberList] = useState([]);

  // const postModel = {
  //   name: "",
  //   tel1: 0,
  //   tel2: 0,
  //   extra: "teste",
  //   whatsapp: false,
  // };
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

  let handleSubmitFunc = () =>
    HandleSubmit(
      setHandleBox,
      setHandleName,
      setHandleTel1,
      setHandleTel2,
      setHandleExtra,
      handleName,
      handleTel1,
      handleTel2,
      handleExtra,
      handleBox
    );

  function handleSearchName(e) {
    setSearchName(e);
  }

  function handleSearchNumber(e) {
    setSearchNumber(e);
  }

  let handleSearchFunc = () =>
    HandleSubmitSearch(
      setSearchName,
      setSearchNumber,
      setSearchByNameList,
      setSearchByNumberList,
      setSearchByNameNumberList,
      searchNumber,
      searchName
    );

  function handleBackSearch() {
    setShowHideSearch(false);
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
              type={"text"}
              placeholder={"Digite o telefone(1) aqui"}
              textLabel={"Telefone(1)"}
              name={"telefone1"}
              makeChange={handleChangeTel1}
              maxLength={"11"}
            />
          </div>
          <div>
            <InputRegClient
              type={"text"}
              placeholder={"Digite o telefone(2) aqui"}
              textLabel={"Telefone(2)"}
              name={"telefone2"}
              makeChange={handleChangeTel2}
              maxLength={"11"}
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
              type={"submit"}
              textButton={"Salvar Cadastro"}
              colorBg={"colorBgSave"}
              colorText={"colorTextSave"}
              onClick={handleSubmitFunc}
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
      <div
        id="form2"
        className={`${styles.divFormStyles} ${
          showHideSearch === true ? styles.divFormShowHide : ""
        }`}
      >
        <form>
          <div className={styles.divH2Styles}>
            <h2>Pesquisar Clientes</h2>
          </div>
          <div>
            <InputRegClient
              type={"text"}
              placeholder={"Digite o nome aqui"}
              textLabel={"Por nome"}
              name={"searchName"}
              makeChange={handleSearchName}
            />
          </div>
          <div>
            <InputRegClient
              type={"text"}
              placeholder={"Digite o telefone aqui"}
              textLabel={"Por telefone"}
              name={"searchTel"}
              makeChange={handleSearchNumber}
              maxLength={"11"}
            />
          </div>
          <div className={styles.buttonStyles}>
            <ButtonGeneric
              type={"button"}
              textButton={"Pesquisar"}
              colorBg={"colorBgSave"}
              colorText={"colorTextSave"}
              onClick={handleSearchFunc}
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
      <div
        id="form3"
        className={`${styles.divFormStyles} ${
          showHideSearch === false ? styles.divFormShowHide : ""
        }`}
      >
        <form>
          <div>
            <div className={styles.divH2Styles}>
              <h2>Dados Editáveis do Cliente</h2>
            </div>
            <div>
              <InputRegClient
                type={"text"}
                textLabel={"Nome:"}
                name={"NomeDadosCliente"}
                makeChange={handleChangeName}
              />
            </div>
            <div>
              <InputRegClient
                type={"text"}
                textLabel={"Telefone(1)"}
                name={"telefone1DadosCLiente"}
                makeChange={handleChangeTel1}
                maxLength={"11"}
              />
            </div>
            <div>
              <InputRegClient
                type={"text"}
                textLabel={"Telefone(2)"}
                name={"telefone2DadosCLiente"}
                makeChange={handleChangeTel2}
                maxLength={"11"}
              />
            </div>
            <div>
              <TextArea
                textLabel={"Extras:"}
                type={"text"}
                name={"observacaoDadosCliente"}
                rows={"10"}
                cols={"75"}
                onChange={handleChangeExtra}
              />
            </div>
            <div className={styles.checkWhatsapp}>
              <InputRegClient
                type={"checkbox"}
                textLabel={"Esse cliente tem whatsapp?"}
                name={"whatsappDadosCliente"}
                makeChange={handleChangeBox}
              />
            </div>
            <div className={styles.buttonStyles}>
              <ButtonGeneric
                type={"submit"}
                textButton={"Salvar Cadastro"}
                colorBg={"colorBgSave"}
                colorText={"colorTextSave"}
                onClick={handleSubmitFunc}
              />
              <ButtonGeneric
                type={"reset"}
                textButton={"Limpar dados"}
                colorBg={"colorBgReset"}
                colorText={"colorTextReset"}
              />
              <ButtonGeneric
                type={"button"}
                textButton={"Voltar"}
                colorBg={"colorBgSave"}
                colorText={"colorTextSave"}
                onClick={handleBackSearch}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HomeClient;
