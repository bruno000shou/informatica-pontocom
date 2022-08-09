import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { Dialog, DialogFooter, DialogType } from "@fluentui/react/lib/Dialog";
import { useState } from "react";
import { Panel } from "@fluentui/react/lib/Panel";
import React from "react";

function ReportButton({ sellNow, showHide }) {
  const dialogContentProps = {
    type: DialogType.normal,
    title: "Tem certeza que deseja fechar a pesquisa?",
  };
  const dialogModalProps = {
    isBlocking: true,
    styles: { main: { maxWidth: 450 } },
  };
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpen2, setDialogOpen2] = useState(false);

  function closeDialog() {
    setDialogOpen(false);
  }

  function closeAll() {
    setDialogOpen2(true);
    setDialogOpen(false);
  }

  function closePanelOpenDialog2() {
    setDialogOpen(true);
  }

  return (
    <div>
      <br />
      <br />
      <Panel
        headerText="Resumo do caixa de hoje"
        isOpen={showHide === 3 && !dialogOpen2 === true ? true : false}
        onDismiss={closePanelOpenDialog2}
        closeButtonAriaLabel="Close"
      >
        <div></div>
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

export default ReportButton;
