import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { Panel } from "@fluentui/react/lib/Panel";
import { Dialog, DialogFooter, DialogType } from "@fluentui/react/lib/Dialog";
import { useState } from "react";
import React from "react";
import styles from "./ShowReceiptSearch.module.css";

function ShowReceiptSearch({
  openPanelReceipt,
  searchReceiptComplete,
  setOpenPanelReceipt,
  setOpenCustomerInput,
  setOpenOsInput,
  setSelectedSearchReceipt,
  selectedSearchReceipt,
  showReceiptPanel,
  setShowReceiptPanel,
}) {
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(true);
  const dialogContentProps = {
    type: DialogType.normal,
    title: "Tem certeza que deseja fechar a pesquisa?",
  };
  const dialogModalProps = {
    isBlocking: true,
    styles: { main: { maxWidth: 450 } },
  };

  let searchContent = searchReceiptComplete;
  let receiptNumber = 0;
  let receiptName = "";
  let year = "";
  let month = "";
  let day = "";

  if (searchContent && searchContent.length > 0 && showReceiptPanel === 1) {
    return (
      <div>
        <div>
          <br />
          <br />
          <Panel
            headerText="A pesquisa encontrou o seguinte resultado"
            isOpen={openPanelReceipt === true ? true : false}
            onDismiss={() => {
              setReceiptDialogOpen(false);
            }}
            closeButtonAriaLabel="Close"
          >
            {searchContent.map((item) => {
              receiptNumber = item.number;
              receiptName = item.name;
              year = item.date.slice(0, 4);
              month = item.date.slice(4, 6);
              day = item.date.slice(6, 8);
              return (
                <div>
                  <div className={styles.searchReceiptBox}>
                    <button
                      name={item.id}
                      className={styles.searchReceiptUnit}
                      onClick={() => {
                        setSelectedSearchReceipt(item.id);
                      }}
                    >
                      Nº Recibo : {receiptNumber}
                      <br />
                      {receiptName}
                      <br />
                      {day}/{month}/{year}
                    </button>
                  </div>
                </div>
              );
            })}
          </Panel>
          <Dialog
            hidden={receiptDialogOpen}
            onDismiss={() => {
              setReceiptDialogOpen(true);
            }}
            dialogContentProps={dialogContentProps}
            modalProps={dialogModalProps}
          >
            <DialogFooter>
              <PrimaryButton
                onClick={() => {
                  setReceiptDialogOpen(true);
                  setOpenPanelReceipt(false);
                  setOpenCustomerInput(false);
                  setOpenOsInput(false);
                }}
                text="Fechar"
              />
              <DefaultButton
                onClick={() => {
                  setReceiptDialogOpen(true);
                }}
                text="Voltar"
              />
            </DialogFooter>
          </Dialog>
        </div>
      </div>
    );
  } else if (
    searchContent &&
    searchContent.length > 0 &&
    showReceiptPanel === 2
  ) {
    return (
      <div>
        <div>
          <br />
          <br />
          <Panel
            headerText="Selecione o cadastro de cliente desejado"
            isOpen={openPanelReceipt === true ? true : false}
            onDismiss={() => {
              setReceiptDialogOpen(false);
            }}
            closeButtonAriaLabel="Close"
          >
            {searchContent.map((item) => {
              receiptNumber = item.tel1;
              receiptName = item.name;
              return (
                <div>
                  <div className={styles.searchReceiptBox}>
                    <button
                      name={item.id}
                      className={styles.searchReceiptUnit}
                      onClick={() => {
                        setSelectedSearchReceipt(item.id);
                      }}
                    >
                      {receiptName}
                      <br />
                      Telefone: {receiptNumber}
                    </button>
                  </div>
                </div>
              );
            })}
          </Panel>
          <Dialog
            hidden={receiptDialogOpen}
            onDismiss={() => {
              setReceiptDialogOpen(true);
            }}
            dialogContentProps={dialogContentProps}
            modalProps={dialogModalProps}
          >
            <DialogFooter>
              <PrimaryButton
                onClick={() => {
                  setReceiptDialogOpen(true);
                  setOpenPanelReceipt(false);
                  setOpenCustomerInput(false);
                  setOpenOsInput(false);
                }}
                text="Fechar"
              />
              <DefaultButton
                onClick={() => {
                  setReceiptDialogOpen(true);
                }}
                text="Voltar"
              />
            </DialogFooter>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default ShowReceiptSearch;
