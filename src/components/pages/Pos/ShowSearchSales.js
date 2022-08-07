import styles from "./ShowSearchSales.module.css";
import React, { useEffect } from "react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { Panel } from "@fluentui/react/lib/Panel";
import { Dialog, DialogFooter, DialogType } from "@fluentui/react/lib/Dialog";
import { useState } from "react";

function ShowSearchSales({ showHide, searchComplete }) {
  let dataSearch = searchComplete;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpen2, setDialogOpen2] = useState(false);
  const dialogContentProps = {
    type: DialogType.normal,
    title: "Tem certeza que deseja fechar a pesquisa?",
  };
  const dialogModalProps = {
    isBlocking: true,
    styles: { main: { maxWidth: 450 } },
  };

  function closePanelOpenDialog() {
    setDialogOpen(true);
  }

  function closePanelOpenDialog2() {
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
  }

  function closeDialog2() {
    setDialogOpen2(false);
  }

  function closeAll() {
    setDialogOpen2(true);
    setDialogOpen(false);
  }

  // function closeAll() {
  //   showHide = 80;
  //   setDialogOpen(false);
  // }

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
          isOpen={showHide === 2 && !dialogOpen2 === true ? true : false}
          // isOpen={dialogOpen2}
          onDismiss={closePanelOpenDialog2}
          closeButtonAriaLabel="Close"
        ></Panel>
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
