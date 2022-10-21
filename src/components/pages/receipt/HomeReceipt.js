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
  const [searchReceiptNameContent, setSearchReceiptNameContent] = useState("");
  const [searchReceiptNumberContent, setSearchReceiptNumberContent] = useState(
    ""
  );
  const [searchReceiptInitDate, setSearchReceiptInitDate] = useState("");
  const [searchReceiptFinalDate, setSearchReceiptFinalDate] = useState("");

  let handleReceiptSubmitFunc = () => {
    HandleReceiptSubmit(
      nameReceipt,
      valorReceipt,
      equipReceipt,
      serviceReceipt,
      osReceipt,
      // setServiceReceipt,
      // setEquipReceipt,
      // setValorReceipt,
      // setNameReceipt,
      // setOsReceipt,
      setNumberReceipt
    );
    setConfirmPrintDialog(true);
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
  }

  return (
    <div className={styles.containerHome}>
      <div id="form1" className={styles.divFormStyles}>
        <form>
          <div className={styles.divH2Styles}>
            <h2>Criar Recibo</h2>
          </div>
          <div className={styles.buttonFindClient}>
            <ButtonGeneric
              textButton={"Pesquisar Cliente ou OS"}
              colorBg={"colorBgFindCliente"}
              colorText={"colorTextFindClient"}
              className={styles.buttonClient}
            />
          </div>
          <div>
            <InputRegClient
              type={"text"}
              placeholder={"Digite a O.S. aqui"}
              textLabel={"O.S."}
              name={"ordemDeServico"}
              // makeChange={handleChangeOsReceipt}
              makeChange={(e) => HandleChangeInput(e, setOsReceipt)}
            />
          </div>
          <div>
            <InputRegClient
              type={"text"}
              placeholder={"Digite o nome aqui"}
              textLabel={"Nome:"}
              name={"nome"}
              // makeChange={handleChangeNameReceipt}
              makeChange={(e) => HandleChangeInput(e, setNameReceipt)}
            />
          </div>
          <div>
            <InputRegClient
              type={"number"}
              placeholder={"Digite o valor aqui"}
              textLabel={"Valor R$"}
              name={"Valor"}
              // makeChange={handleChangeValorReceipt}
              makeChange={(e) => HandleChangeInput(e, setValorReceipt)}
            />
          </div>
          <div>
            <InputRegClient
              type={"text"}
              placeholder={"Digite o equipamento aqui"}
              textLabel={"Equip:"}
              name={"equipamento"}
              // makeChange={handleChangeEquipReceipt}
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
              // onChange={handleChangeServiceReceipt}
              onChange={(e) => HandleChangeInput(e, setServiceReceipt)}
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
              type={"number"}
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
              onClick={() =>
                HandleSubmitSearchReceipt(
                  searchTelReceipt,
                  searchNameReceipt,
                  setSearchReceiptNameContent,
                  setSearchReceiptNumberContent,
                  searchReceiptInitDate,
                  searchReceiptFinalDate
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
          <DraggableDialog
            open={confirmPrintDialog}
            handleClose={PrintReceiptConfirm}
            titleText="Deseja imprimir?"
            dialogBox="Impressão esta sendo preparada"
          />
        </form>
      </div>
    </div>
  );
}

export default HomeReceipt;
