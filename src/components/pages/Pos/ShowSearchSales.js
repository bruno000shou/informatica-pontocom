import styles from "./ShowSearchSales.module.css";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { Panel } from "@fluentui/react/lib/Panel";
import { Dialog, DialogFooter, DialogType } from "@fluentui/react/lib/Dialog";
import { useState } from "react";
import React from "react";

import SetBooleanFalse from "../../../helpers/SetBooleanFalse";

function ShowSearchSales({ showHide, searchComplete, setShowSearch }) {
  let dataSearch = searchComplete;
  let day;
  let month;
  let year;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [openReportVerif, setOpenReportVerif] = useState(false);
  const [openReportVerif2, setOpenReportVerif2] = useState(false);
  const [allMoney, setAllMoney] = useState(0);
  const [allCredit, setAllCredit] = useState(0);
  const [allDebit, setAllDebit] = useState(0);
  const [allPix, setAllPix] = useState(0);
  const [allDevolucao, setAllDevolucao] = useState(0);
  const [varAll, setVarAll] = useState(0);
  const [datePainel, setDatePainel] = useState(0);
  const dialogContentProps = {
    type: DialogType.normal,
    title: "Tem certeza que deseja fechar a pesquisa?",
  };
  const dialogModalProps = {
    isBlocking: true,
    styles: { main: { maxWidth: 450 } },
  };

  function openReport(item) {
    setOpenReportVerif2(true);
    setOpenReportVerif(true);
    let day = item.datePos.slice(6, 8);
    let month = item.datePos.slice(4, 6);
    let year = item.datePos.slice(0, 4);
    let auxdate = day + "/" + month + "/" + year;

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

    item.sales.map((aux) => {
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
    setDatePainel(auxdate);
  }

  function ordenateGrow() {
    dataSearch.sort(function(x, y) {
      return x.datePos - y.datePos;
    });
  }

  return (
    <div>
      <div>
        <br />
        <br />
        <Panel
          headerText="A pesquisa encontrou o seguinte resultado"
          isOpen={showHide === 2 ? true : false}
          onDismiss={() => setDialogOpen(true)}
          closeButtonAriaLabel="Close"
        >
          <div
            className={`${styles.stylesTemplateBoxes}
             ${openReportVerif === false ? "" : styles.showHideReport}`}
          >
            {ordenateGrow()}
            {dataSearch.map((item) => {
              {
                year = item.datePos.slice(0, 4);
              }
              {
                month = item.datePos.slice(4, 6);
              }
              {
                day = item.datePos.slice(6, 8);
              }
              return (
                <>
                  <div className={styles.btnSearchSalesUnit}>
                    <button
                      name={item.datePos}
                      className={styles.searchSalesUnit}
                      onClick={() => openReport(item)}
                    >
                      {day}/{month}/{year}
                    </button>
                  </div>
                </>
              );
            })}
          </div>
          <div
            className={openReportVerif2 === true ? "" : styles.showHideReport}
          >
            <div className={styles.showPainelContent}>
              <h2>Caixa do dia {datePainel}</h2>
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
          </div>
        </Panel>
        <Dialog
          hidden={!dialogOpen}
          onDismiss={() => setDialogOpen(false)}
          dialogContentProps={dialogContentProps}
          modalProps={dialogModalProps}
        >
          <DialogFooter>
            <PrimaryButton
              onClick={() => {
                SetBooleanFalse(
                  setOpenReportVerif,
                  setOpenReportVerif2,
                  setDialogOpen
                );
                setShowSearch(0);
              }}
              text="Fechar"
            />
            <DefaultButton onClick={() => setDialogOpen(false)} text="Voltar" />
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
}

export default ShowSearchSales;
