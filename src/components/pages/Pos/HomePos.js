import styles from "./HomePos.module.css";
import ButtonSave from "../../templates/ButtonSave";
import InputRegClient from "../../templates/InputRegClient";
import { useState } from "react";
import DraggableDialog from "../../templates/DraggableDialog";

function HomePos() {
  // VERIFICAR O ESTADO DOS BOTOES, PASANDO PRO STATE TRUE OU FALSE

  const servStateType = {
    btnServicoInformatica: false,
    btnServicoCelular: false,
    btnServicoTelevisao: false,
    btnServicosDiversos: false,
    btnProdutos: false,
    btnSaidaDevolucao: false,
  };
  const payTypeType = {
    payTypeMoney: false,
    payTypeCredit: false,
    payTypeDebit: false,
    payTypePix: false,
  };
  const payValueType = 0;

  const [service, setService] = useState(servStateType);
  const [payType, setPayType] = useState(payTypeType);
  const [payValue, setPayValue] = useState(payValueType);
  const [openDialog, setOpenDialog] = useState(false);

  function setServiceValue(name) {
    setService({ ...servStateType, [name]: true });
  }
  function setPayTypeValue(name) {
    setPayType({ ...payTypeType, [name]: true });
  }

  function resetSellStates() {
    setPayType({ ...payTypeType, key: false });
    setService({ ...servStateType, key: false });
    setPayValue(0);
  }
  function handleChange(e) {
    setPayValue(e);
    console.log(e);
  }

  function openDaily() {
    setOpenDialog(true);
  }
  function handleCloseDialog() {
    setOpenDialog(false);
  }

  return (
    <div className={styles.sellContainer}>
      <div className={styles.sellTypeButton}>
        <div>
          <ButtonSave
            eClick={setServiceValue}
            textButton={"Serviço Informática"}
            colorBg={"colorBgSell"}
            colorText={"colorTextSell"}
            name={"btnServicoInformatica"}
            focus={service.btnServicoInformatica}
          />
        </div>
        <div>
          <ButtonSave
            eClick={setServiceValue}
            textButton={"Serviço Celular"}
            colorBg={"colorBgSell"}
            colorText={"colorTextSell"}
            name={"btnServicoCelular"}
            focus={service.btnServicoCelular}
          />
        </div>
        <div>
          <ButtonSave
            eClick={setServiceValue}
            textButton={"Serviço Televisão"}
            colorBg={"colorBgSell"}
            colorText={"colorTextSell"}
            name={"btnServicoTelevisao"}
            focus={service.btnServicoTelevisao}
          />
        </div>
        <div>
          <ButtonSave
            eClick={setServiceValue}
            textButton={"Serviços Diversos"}
            colorBg={"colorBgSell"}
            colorText={"colorTextSell"}
            name={"btnServicosDiversos"}
            focus={service.btnServicosDiversos}
          />
        </div>
        <div>
          <ButtonSave
            eClick={setServiceValue}
            textButton={"Produtos"}
            colorBg={"colorBgSell"}
            colorText={"colorTextSell"}
            name={"btnProdutos"}
            focus={service.btnProdutos}
          />
        </div>
        <div>
          <ButtonSave
            eClick={setServiceValue}
            textButton={"Saída ou Devolução"}
            colorBg={"colorBgSellDevolution"}
            colorText={"colorTextSellDevolution"}
            name={"btnSaidaDevolucao"}
            focus={service.btnSaidaDevolucao}
          />
        </div>
      </div>
      <div className={styles.sellValorInput}>
        <h2>Valor total:</h2>
        <div className={styles.sellValorInputBox}>
          <InputRegClient
            type={"number"}
            name={"sellValor"}
            placeholder={payValue}
            value={payValue}
            makeChange={handleChange}
          />
        </div>
        <div className={styles.payTypes}>
          <ButtonSave
            eClick={setPayTypeValue}
            textButton={"Dinheiro"}
            colorBg={"colorBgPayTypes"}
            colorText={"colorTextPayTypes"}
            name={"payTypeMoney"}
            focus={payType.payTypeMoney}
          />
          <ButtonSave
            eClick={setPayTypeValue}
            textButton={"Crédito"}
            colorBg={"colorBgPayTypes"}
            colorText={"colorTextPayTypes"}
            name={"payTypeCredit"}
            focus={payType.payTypeCredit}
          />
          <ButtonSave
            eClick={setPayTypeValue}
            textButton={"Débito"}
            colorBg={"colorBgPayTypes"}
            colorText={"colorTextPayTypes"}
            name={"payTypeDebit"}
            focus={payType.payTypeDebit}
          />
          <ButtonSave
            eClick={setPayTypeValue}
            textButton={"Pix"}
            colorBg={"colorBgPayTypes"}
            colorText={"colorTextPayTypes"}
            name={"payTypePix"}
            focus={payType.payTypePix}
          />
        </div>
        <div className={styles.sellValorInputBot}>
          <ButtonSave
            textButton={"Concluir Venda"}
            colorBg={"colorBgSellDeal"}
            colorText={"colorTextSellDeal"}
          />
          <ButtonSave
            eClick={resetSellStates}
            textButton={"Limpar"}
            type="reset"
            colorBg={"colorBgSellFinishReset"}
            colorText={"colorTextSellFinishReset"}
          />
        </div>
      </div>
      <div className={styles.sellManager}>
        <ButtonSave
          textButton={"Abrir Caixa"}
          colorBg={"colorBgSellManager"}
          colorText={"colorTextSellManager"}
          eClick={openDaily}
        />
        <ButtonSave
          textButton={"Fechar Caixa"}
          colorBg={"colorBgSellManager"}
          colorText={"colorTextSellManager"}
          eClick={openDaily}
        />
        <ButtonSave
          textButton={"Relatório Dia"}
          colorBg={"colorBgSellManager"}
          colorText={"colorTextSellManager"}
        />
        <ButtonSave
          textButton={"Imprimir Caixa"}
          colorBg={"colorBgSellManager"}
          colorText={"colorTextSellManager"}
        />
        <ButtonSave
          textButton={"Pesquisar Caixa"}
          colorBg={"colorBgSellManager"}
          colorText={"colorTextSellManager"}
        />
      </div>
      <DraggableDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        titleText="Caixa Aberto"
        dialogBox="O caixa do dia foi aberto. Ao final do dia, feche o caixa"
      />
      {/* <DraggableDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        titleText="Caixa Fechado"
        dialogBox="O caixa foi fechado. Para inserir vendas, abra um novo caixa"
      /> */}
    </div>
  );
}

export default HomePos;
