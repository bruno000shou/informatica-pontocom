import React, { useState } from "react";
import styles from "./HomeClient.module.css";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { Panel } from "@fluentui/react/lib/Panel";
import { Dialog, DialogFooter, DialogType } from "@fluentui/react/lib/Dialog";
import whatsapp from "../../../img/whatsapp.png";
import DraggableDialog from "../../templates/DraggableDialog";

import HandleSubmitSearch from "./HandleSubmitSearch";
import HandleSubmit from "./HandleSubmit";
import InputRegClient from "../../templates/InputRegClient";
import ButtonGeneric from "../../templates/ButtonGeneric";
import TextArea from "../../templates/TextArea";
import HandleSaveDataClient from "./HandleSaveDataClient";
import HelperResetsellstates from "../../../helpers/HelperResetsellstates";
import HandleChangeInput from "./homeClientHelpers/HandleChangeInput";
import HandleChangeBox from "./homeClientHelpers/HandleChangeBox";
import SetBooleanState from "./homeClientHelpers/SetBooleanState";

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
  const [handleSubmitDialog, setHandleSubmitDialog] = useState(false);
  const [handleSearchDialog, setHandleSearchDialog] = useState(false);
  const [handleSaveDialog, setHandleSaveDialog] = useState(false);

  const dialogContentProps = {
    type: DialogType.normal,
    title: "Tem certeza que deseja fechar a pesquisa?",
  };
  const dialogModalProps = {
    isBlocking: true,
    styles: { main: { maxWidth: 450 } },
  };

  function openReport(item) {
    SetBooleanState(
      setOpenPainelClientDialog,
      !openPainelClientDialog,
      setShowHideSearcPainel,
      showHideSearchPainel
    );
    setShowHideSearch(true);
    setClientEditName(item.name);
    setClientEditTel1(item.tel1);
    setClientEditTel2(item.tel2);
    setClientEditExtra(item.extra);
    setClientCheckEditBox(item.whatsapp);
    setClienteEditId(item.id);
  }

  return (
    <div className={styles.containerHome}>
      <Panel
        headerText="A pesquisa encontrou os cadastros de clientes abaixo:"
        isOpen={showHideSearchPainel === true ? true : false}
        closeButtonAriaLabel="Close"
        onDismiss={() => setOpenPainelClientDialog(true)}
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
              makeChange={(e) => HandleChangeInput(e, setHandleName)}
            />
          </div>
          <div>
            <InputRegClient
              type={"text"}
              placeholder={"Digite o telefone(1) aqui"}
              textLabel={"Telefone(1)"}
              name={"telefone1"}
              makeChange={(e) => HandleChangeInput(e, setHandleTel1)}
              maxLength={"11"}
            />
          </div>
          <div>
            <InputRegClient
              type={"text"}
              placeholder={"Digite o telefone(2) aqui"}
              textLabel={"Telefone(2)"}
              name={"telefone2"}
              makeChange={(e) => HandleChangeInput(e, setHandleTel2)}
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
              onChange={(e) => HandleChangeInput(e, null, setHandleExtra)}
            />
          </div>
          <div className={styles.checkWhatsapp}>
            <InputRegClient
              type={"checkbox"}
              textLabel={"Esse cliente tem whatsapp?"}
              name={"whatsapp"}
              makeChange={(e) => HandleChangeBox(handleBox, setHandleBox)}
            />
          </div>
          <div className={styles.buttonStyles}>
            <ButtonGeneric
              type={"button"}
              textButton={"Salvar Cadastro"}
              colorBg={"colorBgSave"}
              colorText={"colorTextSave"}
              onClick={() => {
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
                  handleBox,
                  setHandleSubmitDialog
                );
                setHandleSaveDialog(true);
              }}
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
              makeChange={(e) => HandleChangeInput(e, setSearchName)}
            />
          </div>
          <div>
            <InputRegClient
              type={"text"}
              placeholder={"Digite o telefone aqui"}
              textLabel={"Por tel."}
              name={"searchTel"}
              maxLength={"11"}
              makeChange={(e) => HandleChangeInput(e, setSearchNumber)}
            />
          </div>
          <div className={styles.buttonStyles}>
            <ButtonGeneric
              type={"button"}
              textButton={"Pesquisar"}
              colorBg={"colorBgSave"}
              colorText={"colorTextSave"}
              onClick={() =>
                HandleSubmitSearch(
                  setSearchByNameNumberList,
                  setShowHideSearcPainel,
                  searchNumber,
                  searchName,
                  setHandleSearchDialog
                )
              }
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
                makeChange={(e) => HandleChangeInput(e, setClientEditName)}
              />
            </div>
            <div>
              <InputRegClient
                type={"text"}
                textLabel={"Telefone(1)"}
                value={clientEditTel1}
                name={"telefone1DadosCLiente"}
                maxLength={"11"}
                makeChange={(e) => HandleChangeInput(e, setClientEditTel1)}
              />
            </div>
            <div>
              <InputRegClient
                type={"text"}
                textLabel={"Telefone(2)"}
                value={clientEditTel2}
                name={"telefone2DadosCLiente"}
                maxLength={"11"}
                makeChange={(e) => HandleChangeInput(e, setClientEditTel2)}
              />
            </div>
            <div>
              <label className={styles.labelStyles}>
                <p>Extras:</p>
              </label>
              <textarea
                className={`${styles.textAreaStyles} ${styles.inputStyles}`}
                type={"text"}
                name={"observacaoDadosCliente"}
                value={clientEditExtra}
                rows={"10"}
                cols={"72"}
                onChange={(e) =>
                  HandleChangeInput(e.target.value, setClientEditExtra)
                }
              />
            </div>
            <div className={styles.checkWhatsappEditBox}>
              <InputRegClient
                type={"checkbox"}
                textLabel={"Esse cliente tem whatsapp?"}
                check={clientCheckEditBox}
                name={"whatsappDadosCliente"}
                makeChange={(e) =>
                  HandleChangeBox(clientCheckEditBox, setClientCheckEditBox)
                }
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
                type={"button"}
                textButton={"Salvar Dados"}
                colorBg={"colorBgSave"}
                colorText={"colorTextSave"}
                onClick={() => {
                  HandleSaveDataClient(
                    clientCheckEditBox,
                    clientEditExtra,
                    clientEditTel2,
                    clientEditTel1,
                    clientEditName,
                    clienteEditId
                  );
                  setHandleSaveDialog(true);
                }}
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
                onClick={() => setShowHideSearch(false)}
              />
            </div>
          </div>
        </form>
        {
          <DraggableDialog
            open={handleSubmitDialog}
            handleClose={() => HelperResetsellstates(setHandleSubmitDialog)}
            titleText="Dados incompletos"
            dialogBox="O nome e o telefone 1 do cliente são obrigatórios"
          />
        }
        <DraggableDialog
          open={handleSearchDialog}
          handleClose={() => HelperResetsellstates(setHandleSearchDialog)}
          titleText="Pesquisa incompleta"
          dialogBox="É preciso preencher algum dos métodos de pesquisa"
        />
        <DraggableDialog
          open={handleSaveDialog}
          handleClose={() => {
            setHandleSaveDialog(false);
            window.location.reload();
          }}
          titleText="Cadastro Concluído"
          dialogBox="Os dados do cliente foram salvos"
        />
        <DraggableDialog
          open={handleSaveDialog}
          handleClose={() => {
            setHandleSaveDialog(false);
            window.location.reload();
          }}
          titleText="Cadastro Atualizado"
          dialogBox="Os dados do cliente foram atualizados"
        />
        <Dialog
          hidden={!openPainelClientDialog}
          onDismiss={() => setOpenPainelClientDialog(false)}
          dialogContentProps={dialogContentProps}
          modalProps={dialogModalProps}
        >
          <DialogFooter>
            <PrimaryButton
              onClick={() =>
                SetBooleanState(
                  setOpenPainelClientDialog,
                  openPainelClientDialog,
                  setShowHideSearcPainel,
                  showHideSearchPainel
                )
              }
              text="Fechar"
            />
            <DefaultButton
              onClick={() => setOpenPainelClientDialog(false)}
              text="Voltar"
            />
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
}

export default HomeClient;
