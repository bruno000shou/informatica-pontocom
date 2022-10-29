import styles from "./HomeReceipt.module.css";
import React, { useState } from "react";
import DraggableDialog from "../../templates/DraggableDialog";

import InputRegClient from "../../templates/InputRegClient";
import HandleReceiptSubmit from "./HandleReceiptSubmit";
import PrintReceipt from "./PrintReceipt";
import ButtonGeneric from "../../templates/ButtonGeneric";
import TextArea from "../../templates/TextArea";
import HandleChangeInput from "./receiptHelpers/HandleChangeInput";
import HandleSubmitSearchReceipt from "./HandleSubmitSearchReceipt";
import ShowReceiptSearch from "./ShowReceiptSearch";
import HandleSearchRegNameReceipt from "./HandleSearchRegNameReceipt";

function HomeReceipt() {
  const [nameReceipt, setNameReceipt] = useState("");
  const [valorReceipt, setValorReceipt] = useState("");
  const [equipReceipt, setEquipReceipt] = useState("");
  const [serviceReceipt, setServiceReceipt] = useState("");
  const [osReceipt, setOsReceipt] = useState("");
  const [confirmPrintDialog, setConfirmPrintDialog] = useState(false);
  const [numberReceipt, setNumberReceipt] = useState("");
  const [searchNameReceipt, setSearchNameReceipt] = useState("");
  const [searchTelReceipt, setSearchTelReceipt] = useState("");
  const [searchReceiptInitDate, setSearchReceiptInitDate] = useState("");
  const [searchReceiptFinalDate, setSearchReceiptFinalDate] = useState("");
  const [searchReceiptComplete, setSearchReceiptComplete] = useState("");
  const [openDialogLessInit, setOpenDialogLessInit] = useState(false);
  const [openDialogLessFinal, setOpenDialogLessFinal] = useState(false);
  const [openDialogNothing, setOpenDialogNothing] = useState(false);
  const [openDialogInitGreaterFinal, setOpenDialogInitGreaterFinal] = useState(
    false
  );
  const [openPanelReceipt, setOpenPanelReceipt] = useState(false);
  const [openRegCustomer, setOpenRegCustomer] = useState(false);
  const [openCustomerInput, setOpenCustomerInput] = useState(false);
  const [openOsInput, setOpenOsInput] = useState(false);
  const [selectNameReceipt, setSelectNameReceipt] = useState("");
  const [selectOsReceipt, setSelectOsReceipt] = useState(""); // vai entrar de alguma forma pra pegar os
  const [selectedSearchReceipt, setSelectedSearchReceipt] = useState("");
  const [showReceiptPanel, setShowReceiptPanel] = useState(0);
  const [showDialogEmptySearch, setShowDialogEmptySearch] = useState(false);

  let handleReceiptSubmitFunc = () => {
    HandleReceiptSubmit(
      nameReceipt,
      valorReceipt,
      equipReceipt,
      serviceReceipt,
      osReceipt,
      setNumberReceipt
    );
    if (
      nameReceipt &&
      valorReceipt &&
      equipReceipt &&
      serviceReceipt &&
      osReceipt
    ) {
      setConfirmPrintDialog(true);
    } else {
      setOpenRegCustomer(true);
    }
  };

  function PrintReceiptConfirm() {
    setConfirmPrintDialog(false);
    PrintReceipt(
      nameReceipt,
      valorReceipt,
      equipReceipt,
      serviceReceipt,
      osReceipt,
      numberReceipt
    );
    window.location.reload();
  }

  return (
    <div className={styles.containerHome}>
      <div id="form1" className={styles.divFormStyles}>
        <form>
          <div className={styles.divH2Styles}>
            <h2>Criar Recibo</h2>
          </div>
          <div
            className={`${styles.buttonFindClient} ${
              openCustomerInput === true || openOsInput
                ? styles.hideReceiptDiv
                : ""
            }`}
          >
            <div className={styles.buttonDiv}>
              <ButtonGeneric
                type={"button"}
                textButton={"Pesquisar Cliente"}
                colorBg={"colorBgFindCliente"}
                colorText={"colorTextFindClient"}
                onClick={() => setOpenCustomerInput(true)}
              />
            </div>
            <div>
              <ButtonGeneric
                type={"button"}
                textButton={"Pesquisar OS"}
                colorBg={"colorBgFindCliente"}
                colorText={"colorTextFindClient"}
                onClick={() => setOpenOsInput(true)}
              />
            </div>
          </div>
          <div
            className={
              openCustomerInput === true || openOsInput
                ? ""
                : styles.hideReceiptDiv
            }
          >
            <InputRegClient
              type={"text"}
              placeholder={`${
                openCustomerInput === true
                  ? "Insira o nome do cliente aqui"
                  : "Insira o número da ordem de serviço"
              }`}
              textLabel={`${
                openCustomerInput === true ? "Cliente:" : "Nº da O.S:"
              }`}
              name={`${
                openCustomerInput === true
                  ? "selectReceiptCustomer"
                  : "selectReceiptOs"
              }`}
              makeChange={
                openCustomerInput === true
                  ? (e) => HandleChangeInput(e, setSelectNameReceipt)
                  : (e) => HandleChangeInput(e, setSelectOsReceipt)
              }
            />
            <div
              className={`${styles.buttonFindClient} ${styles.buttonBackStyles}`}
            >
              <div>
                <ButtonGeneric
                  type={"button"}
                  textButton={"Voltar"}
                  colorBg={"colorBgSave"}
                  colorText={"colorTextSave"}
                  onClick={() => {
                    setOpenCustomerInput(false);
                    setOpenOsInput(false);
                  }}
                />
              </div>
              <div>
                <ButtonGeneric
                  type={"button"}
                  textButton={"Selecionar"}
                  colorBg={"colorBgSave"}
                  colorText={"colorTextSave"}
                  onClick={() => {
                    {
                      setShowReceiptPanel(2);
                      setOpenPanelReceipt(true);
                    }
                    openCustomerInput === true
                      ? HandleSearchRegNameReceipt(
                          selectNameReceipt,
                          setSearchReceiptComplete,
                          setShowDialogEmptySearch
                        )
                      : console.log("selectOsReceipt");
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <InputRegClient
              type={"text"}
              placeholder={"Digite a O.S. aqui"}
              textLabel={"O.S."}
              name={"ordemDeServico"}
              makeChange={(e) => HandleChangeInput(e, setOsReceipt)}
            />
          </div>
          <div>
            <InputRegClient
              type={"text"}
              placeholder={"Digite o nome aqui"}
              textLabel={"Nome:"}
              name={"nome"}
              makeChange={(e) => HandleChangeInput(e, setNameReceipt)}
            />
          </div>
          <div>
            <InputRegClient
              type={"number"}
              placeholder={"Digite o valor aqui"}
              textLabel={"Valor R$"}
              name={"Valor"}
              makeChange={(e) => HandleChangeInput(e, setValorReceipt)}
            />
          </div>
          <div>
            <InputRegClient
              type={"text"}
              placeholder={"Digite o equipamento aqui"}
              textLabel={"Equip:"}
              name={"equipamento"}
              makeChange={(e) => HandleChangeInput(e, setEquipReceipt)}
            />
          </div>
          <div class={styles.textAreaCor}>
            <TextArea
              type={"text"}
              placeholder={"Digite aqui o serviço executado"}
              textLabel={"Serviço:"}
              name={"observacao"}
              rows={"6"}
              cols={"75"}
              onChange={(e) => HandleChangeInput(e, null, setServiceReceipt)}
            />
          </div>
          <div className={styles.buttonStyles}>
            <ButtonGeneric
              type={"button"}
              textButton={"Salvar e Imprimir"}
              colorBg={"colorBgSave"}
              colorText={"colorTextSave"}
              onClick={handleReceiptSubmitFunc}
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
            <h2>Pesquisar Recibos</h2>
          </div>
          <div>
            <InputRegClient
              type={"text"}
              placeholder="Digite o numero aqui           ( A pesquisa por número do Recibo é prioritária )"
              textLabel={"Por nº:"}
              name={"telefone"}
              makeChange={(e) => HandleChangeInput(e, setSearchTelReceipt)}
            />
          </div>
          <div>
            <InputRegClient
              type={"text"}
              placeholder={"Digite o nome aqui"}
              textLabel={"Por nome:"}
              name={"nome"}
              makeChange={(e) => HandleChangeInput(e, setSearchNameReceipt)}
            />
          </div>
          <div className={styles.inputDate}>
            <div className={styles.divDateStyles}>
              <InputRegClient
                type={"date"}
                textLabel={"Data inicial:"}
                name={"dateIni"}
                labelStyles={"labelStyles"}
                makeChange={(e) =>
                  HandleChangeInput(e, setSearchReceiptInitDate)
                }
              />
            </div>
            <div className={styles.divDateStyles}>
              <InputRegClient
                type={"date"}
                textLabel={"Data final:"}
                name={"dateIni"}
                labelStyles={"labelStyles"}
                makeChange={(e) =>
                  HandleChangeInput(e, setSearchReceiptFinalDate)
                }
              />
            </div>
          </div>
          <div className={styles.buttonStyles}>
            <ButtonGeneric
              type={"button"}
              textButton={"Pesquisar recibo"}
              colorBg={"colorBgSave"}
              colorText={"colorTextSave"}
              onClick={() => {
                HandleSubmitSearchReceipt(
                  searchTelReceipt,
                  searchNameReceipt,
                  searchReceiptInitDate,
                  searchReceiptFinalDate,
                  setSearchReceiptComplete,
                  setOpenDialogLessInit,
                  setOpenDialogLessFinal,
                  setOpenDialogNothing,
                  setOpenDialogInitGreaterFinal,
                  setOpenPanelReceipt,
                  setShowDialogEmptySearch
                );
                setShowReceiptPanel(1);
              }}
            />
            <ButtonGeneric
              type={"reset"}
              textButton={"Limpar consulta"}
              colorBg={"colorBgReset"}
              colorText={"colorTextReset"}
            />
          </div>
          <DraggableDialog
            open={confirmPrintDialog}
            handleClose={PrintReceiptConfirm}
            titleText="Deseja imprimir?"
            dialogBox="Impressão esta sendo preparada"
          />
          <DraggableDialog
            open={openDialogLessInit}
            handleClose={() => setOpenDialogLessInit(false)}
            titleText="Falha na pesquisa"
            dialogBox="Não foi escolhida a data inicial"
          />
          <DraggableDialog
            open={openDialogLessFinal}
            handleClose={() => setOpenDialogLessFinal(false)}
            titleText="Falha na pesquisa"
            dialogBox="Não foi escolhida a data final"
          />
          <DraggableDialog
            open={openDialogNothing}
            handleClose={() => setOpenDialogNothing(false)}
            titleText="Falha na pesquisa"
            dialogBox="Nenhum método de pesquisa foi selecionado"
          />
          <DraggableDialog
            open={openDialogInitGreaterFinal}
            handleClose={() => setOpenDialogInitGreaterFinal(false)}
            titleText="Falha na pesquisa"
            dialogBox="A data inicial é mais recente que a data final"
          />
          <DraggableDialog
            open={openRegCustomer}
            handleClose={() => setOpenRegCustomer(false)}
            titleText="Falha no Cadastro"
            dialogBox="É necessário preencher todos os campos do cadastro"
          />
          <DraggableDialog
            open={showDialogEmptySearch}
            handleClose={() => setShowDialogEmptySearch(false)}
            titleText="Busca sem Retorno"
            dialogBox="Não foi encontrado nenhum conteúdo com a sua busca"
          />
          <ShowReceiptSearch
            openPanelReceipt={openPanelReceipt}
            searchReceiptComplete={searchReceiptComplete}
            setOpenPanelReceipt={setOpenPanelReceipt}
            setOpenCustomerInput={setOpenCustomerInput}
            setOpenOsInput={setOpenOsInput}
            setSelectedSearchReceipt={setSelectedSearchReceipt}
            showReceiptPanel={showReceiptPanel}
            setShowReceiptPanel={setShowReceiptPanel}
          />
        </form>
      </div>
    </div>
  );
}

export default HomeReceipt;
