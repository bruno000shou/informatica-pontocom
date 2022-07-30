import styles from "./HomePos.module.css";
import ButtonSave from "../../templates/ButtonSave";
import InputRegClient from "../../templates/InputRegClient";
import { useEffect, useState } from "react";
import DraggableDialog from "../../templates/DraggableDialog";
import axios from "axios";
import { getPaperUtilityClass, getStepButtonUtilityClass } from "@mui/material";

function HomePos() {
  const servStateType = {
    btnServicoInformatica: false,
    btnServicoCelular: false,
    btnServicoTelevisao: false,
    btnServicoDiversos: false,
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
  let sendSellDaily = {
    id: 0,
    openPos: null,
    datePos: null,
  };
  let sendSellInsert = {
    serviceType: "",
    payType: "",
    value: "",
  };

  const [service, setService] = useState(servStateType); // STATE PARA RECEBER O TIPO DE SERVICO DA VENDA
  const [payType, setPayType] = useState(payTypeType); // STATE PARA RECEBER TYPO DE PAGAMENTO
  const [payValue, setPayValue] = useState(payValueType); //STATE PARA RECEBER O VALOR DO INPUT DE VENDA
  const [openDialog, setOpenDialog] = useState(false);
  const [closeDialog, setCloseDialog] = useState(false);
  const [sellDialog, setSellDialog] = useState(false);
  const [printDialog, setPrintDialog] = useState(false);
  const [sellDailyOpen, setSellDailyOpen] = useState(sendSellDaily); //OBJETO PARA FAZER POST DE CAIXA
  const [sellDailyInsertService, setSellDailyInsertService] = useState(""); // STATE PARA SETAR SERVICO NO POST
  const [sellDailyInsertType, setSellDailyInsertType] = useState(""); // STATE PARA SETAR TIPO NO POST
  const [sellDailyInsertValue, setSellDailyInsertValue] = useState(""); // STATE PARA SETAR VALOR NO POST
  const [sellDailyInsertSend, setSellDailyInsertSend] =
    useState(sendSellInsert); //STATE OBJETO PARA POST DE VENDAS
  const [takeDateNow, setTakeDateNow] = useState(""); // STATE PARA ARMAZENAR DATA
  const [sellNow, setSellNow] = useState(); //STATE PARA ARMAZENAR O CAIXA ABERTO AGORA
  const [updateJson, setUpdateJson] = useState(); //STATE PARA RECEBER E ENVIAR TODO O JSON

  // FUNCOES PARA MARCAR OS BOTOES PRESSIONADOS E SETAR EM UM STATE
  function setServiceValue(name) {
    setService({ ...servStateType, [name]: true });
    setSellDailyInsertService(name);
  }
  function setPayTypeValue(name) {
    setPayType({ ...payTypeType, [name]: true });
    setSellDailyInsertType(name);
  }

  // RESET PARA TODOS OS STATES ENVOLVIDOS NA VENDA
  function resetSellStates() {
    setPayType({ ...payTypeType, key: false });
    setService({ ...servStateType, key: false });
    setPayValue(0);
  }

  function handleChange(e) {
    setPayValue(e);
    console.log(e);
    setSellDailyInsertValue(e);
  }

  // SESSAO PARA ABERTURA DE UM CAIXA NO POS
  async function openDaily() {
    // setOpenDialog(true);
    setSellDailyOpen(true);

    if (sellNow == "") {
      await axios.post("http://localhost:5000/dailyList", {
        datePos: takeDateNow,
        openPos: true,
      });
      console.log("Abrir caixa");
      console.log(sellNow);
      getOnLoad();
    } else {
      console.log("Ja tem caixa aberto");
      console.log(sellNow);
    }
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  async function closeDaily() {
    // setCloseDialog(true);
    await axios
      .get("http://localhost:5000/dailyList")
      .then((resp) => setUpdateJson(resp.data))
      .catch((err) => console.log(err));
    await axios.delete("http://localhost:5000/dailyList");

    // axios.put("http://localhost:5000", { hello: "atum" });

    // fetch('http://localhost:5000/projects', {
    //         method: 'POST',
    //         headers: {
    //             'Content-type': 'application/json',
    //         },
    //         body: {hello : "caguei"},
    //     })
  }

  useEffect(() => {
    if (sellNow == "") {
      console.log("Nao ha caixa aberto. Abra um caixa.");
      getOnLoad();
    } else {
      let varSellNow = sellNow;
      let varId;
      if (!!varSellNow && varSellNow.length > 0) {
        varId = varSellNow.find((a) => a);
        varId = varId.id;
      }
      // ATE AQUI, TEMOS O JSON TODO EM UPDATEJASON E VARJSON, TEMOS O ID DO CIXA ABERTO EM VARID,
      // TEMOS O CAIXA COMPLETO ABERTO EM VARSELLNOW E SELLNOW
      let varJson = updateJson;
      if (!!varJson && varJson.length > 0) {
        varJson.map((item) => {
          if (item.id == varId) return (item.openPos = false);
          console.log("Caixa fechado com sucesso");
          setUpdateJson(varJson);
          // axios.put("http://localhost:5000/dailyList", updateJson);
          // console.log("variavel json");
          // console.log(varJson);
          // let aux = Object.assign({}, varJson);
          // console.log("var aux deve ser object");
          // console.log(aux);
          // setUpdateJson(aux);
        });
      }
    }
  }, [updateJson]);

  function handleCloseDialog2() {
    setCloseDialog(false);
  }

  function printDaily() {
    setPrintDialog(true);
  }

  function handlePrintDialog() {
    setPrintDialog(false);
  }

  function sellDaily() {
    setSellDialog(true);
    let auxService = sellDailyInsertService.substr(10);
    let auxType = sellDailyInsertType.substr(7);
    setSellDailyInsertSend({
      serviceType: auxService,
      payType: auxType,
      value: sellDailyInsertValue,
    });
    // axios
    //   .post("http://localhost:5000/dailyList", sellDailyInsertSend)
    //   .then(console.log(sellDailyInsertSend));
  }

  function handleSellDialog() {
    setSellDialog(false);
  }

  // FUNCOES PARA PEGAR DATA E DADOS DE QUALQUER CAIXA ABERTO EM NOSSO SISTEMA

  async function getOnLoad() {
    await axios
      .get("http://localhost:5000/dailyList")
      .then((resp) => setSellNow(resp.data))
      .then(() => (resp) => resp.filter((name) => name.openPos == true))
      .then((resp) => setSellNow(resp))
      .catch((erro) => console.log(erro));
  }

  window.onload = function getDateNow() {
    let dateNow = new Date();
    let dia = String(dateNow.getDate()).padStart(2, "0");
    let mes = String(dateNow.getMonth() + 1).padStart(2, "0");
    let ano = dateNow.getFullYear();
    setTakeDateNow(dia + mes + ano);
    getOnLoad();
  };

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
            name={"btnServicoDiversos"}
            focus={service.btnServicoDiversos}
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
            eClick={sellDaily}
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
          eClick={closeDaily}
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
          eClick={printDaily}
        />
        <ButtonSave
          textButton={"Pesquisar Caixa"}
          colorBg={"colorBgSellManager"}
          colorText={"colorTextSellManager"}
        />
      </div>
      <div className={styles.componentsBox}>
        {/* <DraggableDialog
          open={openDialog}
          handleClose={handleCloseDialog}
          titleText={"Caixa Aberto"}
          dialogBox="O caixa do dia foi aberto. Ao final do dia, feche o caixa"
        /> */}
        {/* {
          <DraggableDialog
            open={closeDialog}
            handleClose={handleCloseDialog2}
            titleText="Caixa Fechado"
            dialogBox="O caixa foi fechado. Para inserir vendas, abra um novo caixa"
          />
        }
        {
          <DraggableDialog
            open={sellDialog}
            handleClose={handleSellDialog}
            titleText="Venda Concluída"
            dialogBox="Venda concluida. Para excluir uma venda use 'Pesquisar Caixa'"
          />
        }
        {
          <DraggableDialog
            open={printDialog}
            handleClose={handlePrintDialog}
            titleText="Impressão em Andamento"
            dialogBox="Impressão foi enviada a impressora"
          />
        } */}
      </div>
    </div>
  );
}

export default HomePos;
