import styles from "./HomePos.module.css";
import { useEffect, useState } from "react";
import React from "react";

import DraggableDialog from "../../templates/DraggableDialog";
import DailyReport from "./DailyReport";
import PrintReport from "./PrintReport";
import PrintHelp from "../../../helpers/PrintHelp";

import SearchSales from "./SearchSales";
import ButtonSave from "../../templates/ButtonSave";
import InputRegClient from "../../templates/InputRegClient";
import HandleChangeInsertValue from "../../../helpers/HandleChangeInsertValue";
import HelperResetsellstates from "../../../helpers/HelperResetsellstates";
import Resetsellstates from "./PosHelpers/ResetSellStates";
import HelperSetFalseAllStates from "../../../helpers/HelperSetFalseAllStates";
import HelperSetTrueAllStates from "../../../helpers/HelperSetTrueAllStates";
import GetOnLoad from "./PosHelpers/GetOnLoad";
import SearchDaily from "./PosHelpers/SearchDaily";
import VerifyReportDaily from "./PosHelpers/VerifyReportDaily";
import OpenDaily from "./PosHelpers/OpenDaily";
import CloseDaily from "./PosHelpers/CloseDaily";
import SellDaily from "./PosHelpers/SellDaily";
import SetServiceValue from "./PosHelpers/SetServiceValue";
import SetPayTypeValue from "./PosHelpers/SetPayTypeValue";

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
  const [openDialogErroSales, setOpenDialogErroSales] = useState(false);
  const [openDialogErroSalesButtons, setOpenDialogErroSalesButtons] = useState(
    false
  );
  const [closeDialog, setCloseDialog] = useState(false);
  const [closeDialogAlready, setCloseDialogAlready] = useState(false);
  const [sellDialog, setSellDialog] = useState(false);
  const [printDialog, setPrintDialog] = useState(false);
  const [printSuportData, setPrintSuportData] = useState();

  useEffect(() => {
    let dateNow = new Date();
    let dia = String(dateNow.getDate()).padStart(2, "0");
    let mes = String(dateNow.getMonth() + 1).padStart(2, "0");
    let ano = dateNow.getFullYear();
    setTakeDateNow(ano + mes + dia);
    GetOnLoad(setUpdateJson, setSellNow);
  }, []);

  return (
    <div className={styles.sellContainer}>
      <div className={styles.sellTypeButton}>
        <div>
          <ButtonSave
            eClick={(value) =>
              SetServiceValue(
                value,
                servStateType,
                setSellDailyInsertService,
                setService
              )
            }
            textButton={"Serviço Informática"}
            colorBg={"colorBgSell"}
            colorText={"colorTextSell"}
            name={"btnServicoInformatica"}
            focus={service.btnServicoInformatica}
          />
        </div>
        <div>
          <ButtonSave
            eClick={(value) =>
              SetServiceValue(
                value,
                servStateType,
                setSellDailyInsertService,
                setService
              )
            }
            textButton={"Serviço Celular"}
            colorBg={"colorBgSell"}
            colorText={"colorTextSell"}
            name={"btnServicoCelular"}
            focus={service.btnServicoCelular}
          />
        </div>
        <div>
          <ButtonSave
            eClick={(value) =>
              SetServiceValue(
                value,
                servStateType,
                setSellDailyInsertService,
                setService
              )
            }
            textButton={"Serviço Televisão"}
            colorBg={"colorBgSell"}
            colorText={"colorTextSell"}
            name={"btnServicoTelevisao"}
            focus={service.btnServicoTelevisao}
          />
        </div>
        <div>
          <ButtonSave
            eClick={(value) =>
              SetServiceValue(
                value,
                servStateType,
                setSellDailyInsertService,
                setService
              )
            }
            textButton={"Serviços Diversos"}
            colorBg={"colorBgSell"}
            colorText={"colorTextSell"}
            name={"btnServicoDiversos"}
            focus={service.btnServicoDiversos}
          />
        </div>
        <div>
          <ButtonSave
            eClick={(value) =>
              SetServiceValue(
                value,
                servStateType,
                setSellDailyInsertService,
                setService
              )
            }
            textButton={"Produtos"}
            colorBg={"colorBgSell"}
            colorText={"colorTextSell"}
            name={"btnServicoProdutos"}
            focus={service.btnServicoProdutos}
          />
        </div>
        <div>
          <ButtonSave
            eClick={(value) =>
              SetServiceValue(
                value,
                servStateType,
                setSellDailyInsertService,
                setService
              )
            }
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
            makeChange={(value) =>
              HandleChangeInsertValue(
                value,
                setPayValue,
                setSellDailyInsertValue
              )
            }
          />
        </div>
        <div className={styles.payTypes}>
          <ButtonSave
            eClick={(value) =>
              SetPayTypeValue(
                value,
                payTypeType,
                setSellDailyInsertType,
                setPayType
              )
            }
            textButton={"Dinheiro"}
            colorBg={"colorBgPayTypes"}
            colorText={"colorTextPayTypes"}
            name={"payTypeMoney"}
            focus={payType.payTypeMoney}
          />
          <ButtonSave
            eClick={(value) =>
              SetPayTypeValue(
                value,
                payTypeType,
                setSellDailyInsertType,
                setPayType
              )
            }
            textButton={"Crédito"}
            colorBg={"colorBgPayTypes"}
            colorText={"colorTextPayTypes"}
            name={"payTypeCredit"}
            focus={payType.payTypeCredit}
          />
          <ButtonSave
            eClick={(value) =>
              SetPayTypeValue(
                value,
                payTypeType,
                setSellDailyInsertType,
                setPayType
              )
            }
            textButton={"Débito"}
            colorBg={"colorBgPayTypes"}
            colorText={"colorTextPayTypes"}
            name={"payTypeDebit"}
            focus={payType.payTypeDebit}
          />
          <ButtonSave
            eClick={(value) =>
              SetPayTypeValue(
                value,
                payTypeType,
                setSellDailyInsertType,
                setPayType
              )
            }
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
            eClick={() =>
              SellDaily(
                sellDailyInsertService,
                sellDailyInsertType,
                sellDailyInsertValue,
                sellNow,
                setOpenDialogErroSales,
                payValue,
                setPayValue,
                setSellDailyInsertType,
                setSellDailyInsertService,
                setPayType,
                setService,
                payTypeType,
                servStateType,
                setSellDialog,
                setSellNow,
                setOpenDialogErroSalesButtons
              )
            }
          />
          <ButtonSave
            eClick={() => {
              HelperResetsellstates(
                setPayValue,
                setSellDailyInsertType,
                setSellDailyInsertService
              );
              Resetsellstates(
                setPayType,
                setService,
                payTypeType,
                servStateType
              );
            }}
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
          textButton={sellNow.length > 0 ? "Caixa Aberto" : "Abrir Caixa"}
          colorBg={
            sellNow.length > 0 ? "colorBgSellManager2" : "colorBgSellManager"
          }
          colorText={
            sellNow.length > 0
              ? "colorTextSellManager2"
              : "colorTextSellManager"
          }
          eClick={() =>
            OpenDaily(
              setOpenDialogAlready,
              setOpenDialog,
              setSellNow,
              setUpdateJson,
              takeDateNow
            )
          }
        />
        <ButtonSave
          textButton={"Fechar Caixa"}
          colorBg={"colorBgSellManager"}
          colorText={"colorTextSellManager"}
          eClick={() =>
            CloseDaily(
              sellNow,
              setCloseDialog,
              setCloseDialogAlready,
              setUpdateJson,
              setSellNow
            )
          }
        />
        <ButtonSave
          textButton={"Relatório Dia"}
          colorBg={"colorBgSellManager"}
          colorText={"colorTextSellManager"}
          eClick={() => {
            GetOnLoad(setUpdateJson, setSellNow);
            VerifyReportDaily(setShowSearch);
          }}
        />
        <ButtonSave
          textButton={"Imprimir Caixa"}
          colorBg={"colorBgSellManager"}
          colorText={"colorTextSellManager"}
          eClick={() => {
            GetOnLoad(setUpdateJson, setSellNow);
            HelperSetTrueAllStates(setPrintDialog);
          }}
        />
        <ButtonSave
          textButton={"Pesquisar Caixa"}
          colorBg={"colorBgSellManager"}
          colorText={"colorTextSellManager"}
          eClick={() => {
            SearchDaily(showSearch, setShowSearch);
            GetOnLoad(setUpdateJson, setSellNow);
          }}
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
          handleClose={() =>
            HelperSetFalseAllStates(setOpenDialog, setOpenDialogAlready)
          }
          titleText={"Abrindo Caixa"}
          dialogBox="O caixa do dia foi aberto. Ao final do dia, feche o caixa"
        />
        <DraggableDialog
          open={openDialogErroSales}
          handleClose={() => HelperSetFalseAllStates(setOpenDialogErroSales)}
          titleText={"Não há caixa aberto"}
          dialogBox="Abra um caixa antes de inserir uma venda"
        />
        <DraggableDialog
          open={openDialogErroSalesButtons}
          handleClose={() =>
            HelperSetFalseAllStates(setOpenDialogErroSalesButtons)
          }
          titleText={"Erro ao inserir uma venda"}
          dialogBox="Verifique os botões de controle de venda ou o valor de entrada"
        />
        <DraggableDialog
          open={openDialogAlready}
          handleClose={() =>
            HelperSetFalseAllStates(setOpenDialog, setOpenDialogAlready)
          }
          titleText={"Caixa Aberto"}
          dialogBox="Já existe um caixa aberto"
        />
        {
          <DraggableDialog
            open={closeDialog}
            handleClose={() =>
              HelperSetFalseAllStates(setCloseDialog, setCloseDialogAlready)
            }
            titleText="Fechando Caixa"
            dialogBox="O caixa foi fechado. Para inserir vendas, abra um novo caixa"
          />
        }
        {
          <DraggableDialog
            open={closeDialogAlready}
            handleClose={() =>
              HelperSetFalseAllStates(setCloseDialog, setCloseDialogAlready)
            }
            titleText="Caixa Fechado"
            dialogBox="Não há caixa aberto, abra um novo caixa"
          />
        }
        {
          <DraggableDialog
            open={sellDialog}
            handleClose={() => HelperSetFalseAllStates(setSellDialog)}
            titleText="Venda Concluída"
            dialogBox="Venda concluida. Para excluir uma venda acesse 'Relatório Dia'"
          />
        }
        {
          <DraggableDialog
            open={printDialog}
            handleClose={() => {
              HelperSetFalseAllStates(setPrintDialog);
              PrintHelp(sellNow, setPrintSuportData);
              PrintReport(printSuportData, takeDateNow);
            }}
            titleText="Deseja imprimir?"
            dialogBox="Impressão esta sendo preparada"
          />
        }
      </div>
    </div>
  );
}

export default HomePos;
