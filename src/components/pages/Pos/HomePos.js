import styles from "./HomePos.module.css";
import ButtonSave from "../../templates/ButtonSave";
import InputRegClient from "../../templates/InputRegClient";
import { useEffect, useState } from "react";
import SearchSales from "./SearchSales";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import DraggableDialog from "../../templates/DraggableDialog";
import DailyReport from "./DailyReport";
import PrintReport from "./PrintReport";
import openReport from "./DailyReport";

function HomePos() {
  const servStateType = {
    btnServicoInformatica: false,
    btnServicoCelular: false,
    btnServicoTelevisao: false,
    btnServicoDiversos: false,
    btnServicoProdutos: false,
    btnServicoDevolucao: false,
  };
  const payTypeType = {
    payTypeMoney: false,
    payTypeCredit: false,
    payTypeDebit: false,
    payTypePix: false,
  };
  const payValueType = "";

  const [takeDateNow, setTakeDateNow] = useState(""); // STATE PARA ARMAZENAR DATA
  const [sellNow, setSellNow] = useState([]); //STATE PARA ARMAZENAR O CAIXA ABERTO AGORA
  const [service, setService] = useState(servStateType); // STATE PARA RECEBER O TIPO DE SERVICO DA VENDA
  const [payType, setPayType] = useState(payTypeType); // STATE PARA RECEBER TYPO DE PAGAMENTO
  const [payValue, setPayValue] = useState(payValueType); //STATE PARA RECEBER O VALOR DO INPUT DE VENDA
  const [sellDailyInsertService, setSellDailyInsertService] = useState(""); // STATE PARA SETAR SERVICO NO POST
  const [sellDailyInsertType, setSellDailyInsertType] = useState(""); // STATE PARA SETAR TIPO NO POST
  const [sellDailyInsertValue, setSellDailyInsertValue] = useState(""); // STATE PARA SETAR VALOR NO POST
  const [updateJson, setUpdateJson] = useState(); //STATE PARA RECEBER E ENVIAR TODO O JSON
  const [showSearch, setShowSearch] = useState(0);
  const [searchComplete, setSearchComplete] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogAlready, setOpenDialogAlready] = useState(false);
  const [closeDialog, setCloseDialog] = useState(false);
  const [closeDialogAlready, setCloseDialogAlready] = useState(false);
  const [sellDialog, setSellDialog] = useState(false);
  const [printDialog, setPrintDialog] = useState(false);
  const [printSuportData, setPrintSuportData] = useState();

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
  function resetsellstates() {
    setPayType({ ...payTypeType, key: false });
    setService({ ...servStateType, key: false });
    setPayValue("");
  }

  function handleChange(e) {
    setPayValue(e);
    setSellDailyInsertValue(e);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
    setOpenDialogAlready(false);
  }

  function handleCloseDialog2() {
    setCloseDialog(false);
    setCloseDialogAlready(false);
  }

  function printDaily() {
    setPrintDialog(true);
    PrintReport(printSuportData, takeDateNow);
  }

  function handlePrintDialog() {
    setPrintDialog(false);
  }

  function handleSellDialog() {
    setSellDialog(false);
  }

  // Abertura de Caixa:
  // Verifica se tem caixa aberto, se tiver, avisa que ja existe, senao abre um caixa novo
  async function openDaily() {
    // setOpenDialog(true);
    let caixaDia;
    await axios
      .get("http://localhost:5000/dailyList")
      .then((resp) => {
        caixaDia = resp.data.dailyList.filter((name) => name.openPos === true);
      })
      .catch((erro) => {
        console.log(erro);
      });
    if (caixaDia.length > 0) {
      console.log("Ja tem caixa aberto");
      setOpenDialogAlready(true);
    } else {
      await axios.post("http://localhost:5000/dailyList", {
        id: uuidv4(),
        datePos: takeDateNow,
        openPos: true,
        sales: [],
      });
      console.log("Abrindo caixa caixa");
      getOnLoad();
      setOpenDialog(true);
    }
    setSellNow(caixaDia);
  }

  // Fechamento de caixa:
  // Verifica se tem caixa fechado, se tiver, fecha passando false para openPos
  // Se nao tiver, avisa que precisa antes abrir um caixa
  async function closeDaily() {
    let varJson;
    await axios
      .get("http://localhost:5000/dailyList")
      .then((resp) => (varJson = resp.data.dailyList))
      .catch((err) => console.log(err));
    let varSellNow = sellNow;
    let varId = "";
    if (
      (!!varSellNow && varSellNow.length > 0) ||
      varSellNow.openPos === true
    ) {
      varId = varSellNow.find((a) => a);
      varId = varId.id; //AQUI NOS TEMOS O ID DO CAIXA ABERTO
      varJson.map(async (item) => {
        if (item.id === varId) item.openPos = false;
        console.log("Caixa fechado com sucesso"); //AQUI SETAMOS FALSE PARA O CAIXA ABERTO
        await axios.put("http://localhost:5000/dailyList", varJson);
      });
      setCloseDialog(true);
    } else {
      console.log("Nao ha caixa aberto. Abra um caixa.");
      setCloseDialogAlready(true);
    }
    getOnLoad();
  }

  // Execução de venda:
  // Insere, no caixa que ja esta aberto, uma venda registrada na pagina
  async function sellDaily() {
    let varJson;
    let caixaDia;
    let auxService = sellDailyInsertService.substr(10);
    let auxType = sellDailyInsertType.substr(7);
    let auxSend = {
      id: uuidv4(),
      serviceType: auxService,
      payType: auxType,
      value: sellDailyInsertValue,
    };
    await axios.get("http://localhost:5000/dailyList").then((resp) => {
      varJson = resp.data.dailyList;
      caixaDia = resp.data.dailyList.filter((name) => name.openPos === true);
    });
    // VARJSON TEM O CAIXA COMPLETO COM A VENDA INCLUIDA
    // CAIXADIA POSSUI O CAIXA ABERTO MAIS A VENDA INCLUIDA
    caixaDia[0].sales.push(auxSend);

    if (
      !!caixaDia &&
      caixaDia.length > 0 &&
      payValue.length > 0 &&
      sellDailyInsertService !== "" &&
      sellDailyInsertType !== ""
    ) {
      axios.put("http://localhost:5000/dailyList", varJson);
      console.log("Venda Incluída com sucesso");
      resetsellstates();
      setSellDialog(true);
      setSellNow(caixaDia); // ALTERADO AQUI PARA ATUALIZAR O VALOR DO CAIXA DIA
      setSellDailyInsertService("");
      setSellDailyInsertType("");
    } else {
      console.log("Não há caixa aberto, precisa abrir um caixa antes");
    }
  }

  function SearchDaily() {
    if (showSearch !== 1) {
      setShowSearch(1);
    }
    getOnLoad();
  }

  function verifyReportDaily() {
    setShowSearch(4);
  }

  // FUNCAO QUE VERIFICA SE TEM UM CAIXA ABERTO NO CAIXA DIA, SE TIVER, ARMAZENA NELE E SETA NO SELLNOW
  function getOnLoad() {
    let caixaDia;
    axios
      .get("http://localhost:5000/dailyList")
      .then((resp) => {
        setUpdateJson(resp.data.dailyList);
        caixaDia = resp.data.dailyList.filter((name) => name.openPos === true);
        setSellNow(caixaDia);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  window.onload = function getDateNow() {
    let dateNow = new Date();
    let dia = String(dateNow.getDate()).padStart(2, "0");
    let mes = String(dateNow.getMonth() + 1).padStart(2, "0");
    let ano = dateNow.getFullYear();
    setTakeDateNow(ano + mes + dia);
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
            name={"btnServicoProdutos"}
            focus={service.btnServicoProdutos}
          />
        </div>
        <div>
          <ButtonSave
            eClick={setServiceValue}
            textButton={"Saída ou Devolução"}
            colorBg={"colorBgSellDevolution"}
            colorText={"colorTextSellDevolution"}
            name={"btnServicoDevolucao"}
            focus={service.btnServicoDevolucao}
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
            eClick={resetsellstates}
            textButton={"Limpar"}
            type="reset"
            colorBg={"colorBgSellFinishReset"}
            colorText={"colorTextSellFinishReset"}
          />
        </div>
      </div>
      <SearchSales
        showHide={showSearch}
        allJson={updateJson}
        setShowSearch={setShowSearch}
        setSearchComplete={setSearchComplete}
        searchComplete={searchComplete}
      />
      <div className={styles.sellManager}>
        <ButtonSave
          active
          className={styles.openDailyStatus}
          // colorBg={"colorBgSellManager"}
          // colorText={"colorTextSell  Manager"}
          textButton={sellNow.length > 0 ? "Caixa Aberto" : "Abrir Caixa"}
          colorBg={
            sellNow.length > 0 ? "colorBgSellManager2" : "colorBgSellManager"
          }
          colorText={
            sellNow.length > 0
              ? "colorTextSellManager2"
              : "colorTextSellManager"
          }
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
          eClick={verifyReportDaily}
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
          eClick={SearchDaily}
        />
        <DailyReport
          showHide={showSearch}
          sellNow={sellNow}
          setShowSearch={setShowSearch}
          setPrintSuportData={setPrintSuportData}
        />
      </div>

      <div className={styles.componentsBox}>
        <DraggableDialog
          open={openDialog}
          handleClose={handleCloseDialog}
          titleText={"Abrindo Caixa"}
          dialogBox="O caixa do dia foi aberto. Ao final do dia, feche o caixa"
        />
        <DraggableDialog
          open={openDialogAlready}
          handleClose={handleCloseDialog}
          titleText={"Caixa Aberto"}
          dialogBox="Já existe um caixa aberto"
        />
        {
          <DraggableDialog
            open={closeDialog}
            handleClose={handleCloseDialog2}
            titleText="Fechando Caixa"
            dialogBox="O caixa foi fechado. Para inserir vendas, abra um novo caixa"
          />
        }
        {
          <DraggableDialog
            open={closeDialogAlready}
            handleClose={handleCloseDialog2}
            titleText="Caixa Fechado"
            dialogBox="Não há caixa aberto, abra um novo caixa"
          />
        }
        {
          <DraggableDialog
            open={sellDialog}
            handleClose={handleSellDialog}
            titleText="Venda Concluída"
            dialogBox="Venda concluida. Para excluir uma venda acesse 'Relatório Dia'"
          />
        }
        {
          <DraggableDialog
            open={printDialog}
            handleClose={handlePrintDialog}
            titleText="Impressão em Andamento"
            dialogBox="Impressão foi enviada a impressora"
          />
        }
      </div>
    </div>
  );
}

export default HomePos;
