import styles from "./ShowSearchSales.module.css";
import React, { useEffect } from "react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { Panel } from "@fluentui/react/lib/Panel";
import { Dialog, DialogFooter, DialogType } from "@fluentui/react/lib/Dialog";
import { useState } from "react";

function ShowSearchSales({ showHide, searchComplete }) {
  let dataSearch = searchComplete;
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const dialogContentProps = {
    type: DialogType.normal,
    title: "Tem certeza que deseja fechar a pesquisa?",
  };
  const dialogModalProps = {
    isBlocking: true,
    styles: { main: { maxWidth: 450 } },
  };

  function closePanel() {
    setDialogOpen(true);
  }

  // function closeDialogPanel() {
  //   setDialogOpen(false);
  // }

  const closeDialogPanel = () => {
    if (showHide === 2) {
      setIsPanelOpen(true);
    }
  };

  function closeDialog() {
    setDialogOpen(false);
  }

  //----------------------------------------------------------------------------------------------
  // o vlor do showHide esta chegando 2 corretamente, porem o if na classe nao esta passando o valor vazio
  // por algum motivo, e nao exibe nem o dialog e nem o painel.
  return (
    <div>
      <div>
        <br />
        <br />
        <Panel
          headerText="A pesquisa encontrou o seguinte resultado"
          // isOpen={showHide === 2 ? true : false}
          isOpen={isPanelOpen}
          onDismiss={closePanel}
          closeButtonAriaLabel="Close"
        ></Panel>
        <Dialog
          hidden={!dialogOpen}
          onDismiss={closeDialog}
          dialogContentProps={dialogContentProps}
          modalProps={dialogModalProps}
        >
          <DialogFooter>
            <PrimaryButton onClick={""} text="Fechar" />
            <DefaultButton onClick={() => closeDialogPanel} text="Voltar" />
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
}

export default ShowSearchSales;
