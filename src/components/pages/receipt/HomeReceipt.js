import styles from "./HomeReceipt.module.css";
import InputRegClient from "../../templates/InputRegClient";
import ButtonGeneric from "../../templates/ButtonGeneric";
import TextArea from "../../templates/TextArea";
import React, { useState } from "react";
import HandleReceiptSubmit from "./HandleReceiptSubmit";
import PrintReceipt from "./PrintReceipt";
import DraggableDialog from "../../templates/DraggableDialog";

function HomeReceipt() {
  const [nameReceipt, setNameReceipt] = useState("");
  const [valorReceipt, setValorReceipt] = useState("");
  const [equipReceipt, setEquipReceipt] = useState("");
  const [serviceReceipt, setServiceReceipt] = useState("");
  const [osReceipt, setOsReceipt] = useState("");
  const [confirmPrintDialog, setConfirmPrintDialog] = useState(false);
  const [numberReceipt, setNumberReceipt] = useState("");

  function handleChangeNameReceipt(e) {
    setNameReceipt(e);
  }
  function handleChangeValorReceipt(e) {
    setValorReceipt(e);
  }
  function handleChangeEquipReceipt(e) {
    setEquipReceipt(e);
  }
  function handleChangeOsReceipt(e) {
    setOsReceipt(e);
  }
  function handleChangeServiceReceipt(e) {
    setServiceReceipt(e.target.value);
  }

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
              makeChange={handleChangeOsReceipt}
            />
          </div>
          <div>
            <InputRegClient
              type={"text"}
              placeholder={"Digite o nome aqui"}
              textLabel={"Nome:"}
              name={"nome"}
              makeChange={handleChangeNameReceipt}
            />
          </div>
          <div>
            <InputRegClient
              type={"number"}
              placeholder={"Digite o valor aqui"}
              textLabel={"Valor R$"}
              name={"Valor"}
              makeChange={handleChangeValorReceipt}
            />
          </div>
          <div>
            <InputRegClient
              type={"text"}
              placeholder={"Digite o equipamento aqui"}
              textLabel={"Equip:"}
              name={"equipamento"}
              makeChange={handleChangeEquipReceipt}
            />
          </div>
          <div>
            <TextArea
              type={"text"}
              placeholder={"Digite aqui o serviço executado"}
              textLabel={"Serviço:"}
              name={"observacao"}
              rows={"6"}
              cols={"75"}
              onChange={handleChangeServiceReceipt}
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
              placeholder={"Digite o nome aqui"}
              textLabel={"Por nome:"}
              name={"nome"}
            />
          </div>
          <div>
            <InputRegClient
              type={"number"}
              placeholder={"Digite o numero aqui"}
              textLabel={"Por numero:"}
              name={"telefone"}
            />
          </div>
          <div className={styles.inputDate}>
            <div className={styles.divDateStyles}>
              <InputRegClient
                type={"date"}
                textLabel={"Data inicial:"}
                name={"dateIni"}
                labelStyles={"labelStyles"}
              />
            </div>
            <div className={styles.divDateStyles}>
              <InputRegClient
                type={"date"}
                textLabel={"Data final:"}
                name={"dateIni"}
                labelStyles={"labelStyles"}
              />
            </div>
          </div>
          <div className={styles.buttonStyles}>
            <ButtonGeneric
              type={"submit"}
              textButton={"Pesquisar recibo"}
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
