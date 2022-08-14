import { useState } from "react";

function PrintHelp(sellNow, setPrintSuportData) {
  let allMoney;
  let allCredit;
  let allDebit;
  let allPix;
  let varAll;
  let allDevolucao;

  if (sellNow.length > 0) {
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
    allCredit = varAllCredit - devAllCredit;
    auxDebit.map((debitValue) => {
      varAllDebit += parseInt(debitValue.value);
    });
    auxDebitDev.map((debitValue) => {
      devAllDebit += parseInt(debitValue.value);
    });
    allDebit = varAllDebit - devAllDebit;
    auxMoney.map((moneyValue) => {
      varAllMoney += parseInt(moneyValue.value);
    });
    auxMoneyDev.map((moneyValue) => {
      devAllMoney += parseInt(moneyValue.value);
    });
    allMoney = varAllMoney - devAllMoney;
    auxPix.map((pixValue) => {
      varAllPix += parseInt(pixValue.value);
    });
    auxPixDev.map((pixValue) => {
      devAllPix += parseInt(pixValue.value);
    });
    allPix = varAllPix - devAllPix;
    let auxVarDev = devAllPix + devAllMoney + devAllDebit + devAllCredit;
    let auxVarAll =
      varAllPix +
      varAllMoney +
      varAllDebit +
      varAllCredit -
      (devAllPix + devAllMoney + devAllDebit + devAllCredit);
    varAll = auxVarAll;
    allDevolucao = auxVarDev;
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
    console.log(printSuport);
  }
}

export default PrintHelp;
