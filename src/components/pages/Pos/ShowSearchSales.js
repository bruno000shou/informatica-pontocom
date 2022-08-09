import styles from "./ShowSearchSales.module.css";
import React from "react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { Panel } from "@fluentui/react/lib/Panel";
import { Dialog, DialogFooter, DialogType } from "@fluentui/react/lib/Dialog";
import { useState } from "react";
// import ButtonGeneric from "../../templates/ButtonSave";

function ShowSearchSales({ showHide, searchComplete }) {
  let dataSearch = searchComplete;
  let day;
  let month;
  let year;

  const [hideShowBox, setHideShowBox] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpen2, setDialogOpen2] = useState(false);
  const [openReportVerif, setOpenReportVerif] = useState(true);
  const dialogContentProps = {
    type: DialogType.normal,
    title: "Tem certeza que deseja fechar a pesquisa?",
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
    setDialogOpen2(true);
    setDialogOpen(false);
  }

  function openReport() {
    setOpenReportVerif(false);
  }

  return (
    <div>
      <div>
        <br />
        <br />
        <Panel
          headerText="A pesquisa encontrou o seguinte resultado"
          isOpen={showHide === 2 && !dialogOpen2 === true ? true : false}
          onDismiss={closePanelOpenDialog2}
          closeButtonAriaLabel="Close"
        >
          <div
            className={`${styles.stylesTemplateBoxes}
             ${openReportVerif === false ? styles.showHideReport : ""}`}
            // className={`${
            //   openReportVerif === false ? styles.showHideReport : ""
            // } ${styles.stylesTemplateBoxes}`}
          >
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
                      name={"boxSearcUnit" + item.datePos}
                      className={styles.searchSalesUnit}
                      onClick={openReport}
                    >
                      {day}/{month}/{year}
                    </button>
                  </div>
                </>
              );
            })}
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
    </div>
  );
}

export default ShowSearchSales;
