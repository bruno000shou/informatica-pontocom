import React, { useState } from "react";
import styles from "./HomeClient.module.css";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { Panel } from "@fluentui/react/lib/Panel";
import { Dialog, DialogFooter, DialogType } from "@fluentui/react/lib/Dialog";
import HandleSubmitSearch from "./HandleSubmitSearch";
import HandleSubmit from "./HandleSubmit";
import InputRegClient from "../../templates/InputRegClient";
import ButtonGeneric from "../../templates/ButtonGeneric";
import TextArea from "../../templates/TextArea";
import HandleSaveDataClient from "./HandleSaveDataClient";
import whatsapp from "../../../img/whatsapp.png";

function HomeClient() {
  const [showHideSearch, setShowHideSearch] = useState(false);
  const [showHideSearchPainel, setShowHideSearcPainel] = useState(false);
  const [openPainelClientDialog, setOpenPainelClientDialog] = useState(false);
  const [handleName, setHandleName] = useState("");
  const [handleTel1, setHandleTel1] = useState("");
  const [handleTel2, setHandleTel2] = useState("");
  const [handleExtra, setHandleExtra] = useState("");
  const [handleBox, setHandleBox] = useState(false);
  const [searchNumber, setSearchNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchByNameNumberList, setSearchByNameNumberList] = useState([]);
  const [clientEditName, setClientEditName] = useState("");
  const [clientEditTel1, setClientEditTel1] = useState("");
  const [clientEditTel2, setClientEditTel2] = useState("");
  const [clientEditExtra, setClientEditExtra] = useState("");
  const [clientCheckEditBox, setClientCheckEditBox] = useState(false);
  const [clienteEditId, setClienteEditId] = useState(0);

  const dialogContentProps = {
    type: DialogType.normal,
    title: "Tem certeza que deseja fechar a pesquisa?",
  };
  const dialogModalProps = {
    isBlocking: true,
    styles: { main: { maxWidth: 450 } },
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

  function handleChangeEditName(e) {
    setClientEditName(e);
  }
  function handleChangeEditTel1(e) {
    setClientEditTel1(e);
  }
  function handleChangeEditTel2(e) {
    setClientEditTel2(e);
  }
  function handleChangeEditExtra(e) {
    setClientEditExtra(e.target.value);
  }

  function handleEditChangeBox() {
    if (clientCheckEditBox === false) {
      setClientCheckEditBox(true);
    } else {
      setClientCheckEditBox(false);
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
      setSearchByNameNumberList,
      setShowHideSearcPainel,
      searchNumber,
      searchName
    );

  function handleBackSearch() {
    setShowHideSearch(false);
  }

  function closePainelClient() {
    setOpenPainelClientDialog(true);
  }

  function closeDialog() {
    setOpenPainelClientDialog(false);
  }

  function closeAll() {
    setOpenPainelClientDialog(false);
    setShowHideSearcPainel(false);
  }

  function handleChangeTextArea(item) {
    setClientEditExtra(item);
  }

  function openReport(item) {
    closeAll();
    setShowHideSearch(true);
    setClientEditName(item.name);
    setClientEditTel1(item.tel1);
    setClientEditTel2(item.tel2);
    setClientEditExtra(item.extra);
    setClientCheckEditBox(item.whatsapp);
    setClienteEditId(item.id);
  }

  let HandleSaveDataClientFunc = () =>
    HandleSaveDataClient(
      clientCheckEditBox,
      clientEditExtra,
      clientEditTel2,
      clientEditTel1,
      clientEditName,
      clienteEditId
    );

  return (
    <div className={styles.containerHome}>
      <Panel
        headerText="A pesquisa encontrou os cadastros de clientes abaixo:"
        isOpen={showHideSearchPainel === true ? true : false}
        onDismiss={closePainelClient}
        closeButtonAriaLabel="Close"
      >
        <div className={styles.stylesTemplateBoxes}>
          {searchByNameNumberList.map((item) => {
            return (
              <>
                <div className={styles.btnSearchSalesUnit}>
                  <button
                    key={item.tel1}
                    name={item.name}
                    className={styles.searchSalesUnit}
                    onClick={() => openReport(item)}
                  >
                    {item.name}
                    <br></br>
                    <p>Telefone: {item.tel1}</p>
                    {item.tel1}
                  </button>
                </div>
              </>
            );
          })}
        </div>
      </Panel>
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
                value={clientEditName}
                name={"NomeDadosCliente"}
                makeChange={handleChangeEditName}
              />
            </div>
            <div>
              <InputRegClient
                type={"text"}
                textLabel={"Telefone(1)"}
                value={clientEditTel1}
                name={"telefone1DadosCLiente"}
                maxLength={"11"}
                makeChange={handleChangeEditTel1}
              />
            </div>
            <div>
              <InputRegClient
                type={"text"}
                textLabel={"Telefone(2)"}
                value={clientEditTel2}
                name={"telefone2DadosCLiente"}
                maxLength={"11"}
                makeChange={handleChangeEditTel2}
              />
            </div>
            <div>
              <label className={styles.labelStyles}>
                <p>Extras:</p>
              </label>
              <textarea
                type={"text"}
                name={"observacaoDadosCliente"}
                value={clientEditExtra}
                rows={"10"}
                cols={"75"}
                className={styles.inputStyles}
                onChange={(item) => handleChangeTextArea(item.target.value)}
              />
            </div>
            <div className={styles.checkWhatsappEditBox}>
              <InputRegClient
                type={"checkbox"}
                textLabel={"Esse cliente tem whatsapp?"}
                check={clientCheckEditBox}
                name={"whatsappDadosCliente"}
                makeChange={handleEditChangeBox}
              />
              <div
                className={
                  clientCheckEditBox === true ? "" : styles.whatsappFalse
                }
              >
                <a
                  href={
                    clientCheckEditBox === true &&
                    `https://wa.me/55${clientEditTel1}`
                  }
                  target="blank"
                >
                  <img
                    src={whatsapp}
                    alt="botao whatsapp para acessar conversas com clientes"
                    className={styles.whatsappButton}
                  ></img>
                </a>
              </div>
            </div>
            <div className={styles.buttonStyles}>
              <ButtonGeneric
                type={"submit"}
                textButton={"Salvar Dados"}
                colorBg={"colorBgSave"}
                colorText={"colorTextSave"}
                onClick={HandleSaveDataClientFunc}
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
        <Dialog
          hidden={!openPainelClientDialog}
          onDismiss={closeDialog}
          dialogContentProps={dialogContentProps}
          modalProps={dialogModalProps}
        >
          <DialogFooter>
            <PrimaryButton onClick={closeAll} text="Fechar" />
            <DefaultButton onClick={closeDialog} text="Voltar" />
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
}

export default HomeClient;
