import React, { useEffect } from "react";
import { Panel } from "@fluentui/react/lib/Panel";
import { Dialog, DialogFooter, DialogType } from "@fluentui/react/lib/Dialog";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { useState } from "react";
import styles from "./DailyReport.module.css";
import ButtonGeneric from "../../templates/ButtonGeneric";

function DailyReport({ showHide, sellNow, setShowSearch, setPrintSuportData }) {
  const [dialogOpen2, setDialogOpen2] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [allMoney, setAllMoney] = useState(0);
  const [allCredit, setAllCredit] = useState(0);
  const [allDebit, setAllDebit] = useState(0);
  const [allPix, setAllPix] = useState(0);
  const [varAll, setVarAll] = useState(0);
  const [allDevolucao, setAllDevolucao] = useState(0);
  console.log(sellNow);
  const dialogContentProps = {
    type: DialogType.normal,
    title: "Tem certeza que deseja fechar o relatório de caixa?",
  };
  const dialogModalProps = {
    isBlocking: true,
    styles: { main: { maxWidth: 450 } },
  };

  function closePanelOpenDialog2() {
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
  }

  function closeAll() {
    setDialogOpen2(false);
    setDialogOpen(false);
    setShowSearch(0);
  }

  useEffect(() => {
    if (!!sellNow && sellNow.length > 0) {
      openReport();
    }
  }, [sellNow]);

  window.onload = () => openReport();

  function openReport() {
    if (sellNow.length > 0) {
      console.log(sellNow);

      let auxCredit = [];
      let auxDebit = [];
      let auxPix = [];
      let auxMoney = [];
      let auxCreditDev = [];
      let auxDebitDev = [];
      let auxPixDev = [];
      let auxMoneyDev = [];

      let varAllCredit = 0;
      let varAllMoney = 0;
      let varAllDebit = 0;
      let varAllPix = 0;

      let devAllCredit = 0;
      let devAllMoney = 0;
      let devAllDebit = 0;
      let devAllPix = 0;

      sellNow[0].sales.map((aux) => {
        if (aux.payType === "Credit") {
          if (aux.serviceType !== "Devolucao") {
            auxCredit.push(aux);
          } else {
            auxCreditDev.push(aux);
          }
        } else if (aux.payType === "Debit") {
          if (aux.serviceType !== "Devolucao") {
            auxDebit.push(aux);
          } else {
            auxDebitDev.push(aux);
          }
        } else if (aux.payType === "Pix") {
          if (aux.serviceType !== "Devolucao") {
            auxPix.push(aux);
          } else {
            auxPixDev.push(aux);
          }
        } else {
          if (aux.serviceType !== "Devolucao") {
            auxMoney.push(aux);
          } else {
            auxMoneyDev.push(aux);
          }
        }
      });

      auxCredit.map((creditValue) => {
        varAllCredit += parseInt(creditValue.value);
      });
      auxCreditDev.map((creditValue) => {
        devAllCredit += parseInt(creditValue.value);
      });
      setAllCredit(varAllCredit - devAllCredit);

      auxDebit.map((debitValue) => {
        varAllDebit += parseInt(debitValue.value);
      });
      auxDebitDev.map((debitValue) => {
        devAllDebit += parseInt(debitValue.value);
      });
      setAllDebit(varAllDebit - devAllDebit);

      auxMoney.map((moneyValue) => {
        varAllMoney += parseInt(moneyValue.value);
      });
      auxMoneyDev.map((moneyValue) => {
        devAllMoney += parseInt(moneyValue.value);
      });
      setAllMoney(varAllMoney - devAllMoney);

      auxPix.map((pixValue) => {
        varAllPix += parseInt(pixValue.value);
      });
      auxPixDev.map((pixValue) => {
        devAllPix += parseInt(pixValue.value);
      });
      setAllPix(varAllPix - devAllPix);

      let auxVarDev = devAllPix + devAllMoney + devAllDebit + devAllCredit;
      let auxVarAll =
        varAllPix +
        varAllMoney +
        varAllDebit +
        varAllCredit -
        (devAllPix + devAllMoney + devAllDebit + devAllCredit);
      setVarAll(auxVarAll);
      setAllDevolucao(auxVarDev);
      let printSuport = [];
      printSuport.push(
        varAllMoney,
        varAllDebit,
        varAllCredit,
        varAllPix,
        auxVarAll,
        devAllPix,
        devAllMoney,
        devAllDebit,
        devAllCredit,
        auxVarDev
      );
      setPrintSuportData(printSuport);
    }
  }

  return (
    <div>
      <Panel
        isOpen={showHide === 4 && !dialogOpen2 === true ? true : false}
        onDismiss={closePanelOpenDialog2}
        closeButtonAriaLabel="Close"
      >
        <div className={styles.showPainelContent}>
          <h2>Relatório do Caixa do Dia</h2>
          <p>Valor total para dinheiro:</p>
          <p className={styles.contentP}>{`R$ ${allMoney}`}</p>
          <br />
          <p>Valor total para crédito:</p>
          <p className={styles.contentP}>{`R$ ${allCredit}`}</p>
          <br />
          <p>Valor total para débito:</p>
          <p className={styles.contentP}>{`R$ ${allDebit}`}</p>
          <br />
          <p>Valor total para pix:</p>
          <p className={styles.contentP}>{`R$ ${allPix}`}</p>
          <br />
          <p>Valor total para devolução: </p>
          <p className={styles.contentDevP}>{`R$ ${allDevolucao}`}</p>
          <br />
          <p>Valor total do caixa:</p>
          <p className={styles.contentAllP}>{`R$ ${varAll}`}</p>
        </div>
      </Panel>
      <Dialog
        hidden={!dialogOpen}
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
  );
}

export default DailyReport;
