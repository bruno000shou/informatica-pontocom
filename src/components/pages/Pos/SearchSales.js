import styles from "./SearchSales.module.css";
import { useState } from "react";
import React from "react";
import DraggableDialog from "../../templates/DraggableDialog";

import ButtonSave from "../../templates/ButtonSave";
import InputRegClient from "../../templates/InputRegClient";
import handleReset from "./PosHelpers/HandleReset";
import HandleChangeInputs from "../../../helpers/HandleChangeInputs";
import ShowSearchSales from "./ShowSearchSales";
import SetBooleanFalse from "../../../helpers/SetBooleanFalse";
import HandleSearchSales from "./HandleSearchSales";

function SearchSales({
  allJson,
  showHide,
  setShowSearch,
  setSearchComplete,
  searchComplete,
  setPrintSuportData,
}) {
  const [initDate, setInitDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [searchFailInit, setSearchFailInit] = useState(false);
  const [searchFailFinal, setSearchFailFinal] = useState(false);
  const [searchFailBoth, setSearchFailBoth] = useState(false);
  const [searchFailInitBigFinal, setSearchFailInitBigFinal] = useState(false);

  function hideDiv() {
    showHide = 0;
  }

  return (
    <div
      className={`${showHide === 1 ? "" : styles.searchHideShow} ${
        styles.searchContainer
      }`}
    >
      <h2>Pesquise o Caixa</h2>
      <form>
        <div className={styles.formDivStyles}>
          <div>
            <InputRegClient
              textLabel={"Data inicial:"}
              type={"date"}
              value={initDate}
              name={"searchInitDate"}
              makeChange={(e) => HandleChangeInputs(e, setInitDate)}
            />
          </div>
          <div>
            <InputRegClient
              textLabel={"Data final:"}
              type={"date"}
              value={finalDate}
              name={"searchFinishDate"}
              makeChange={(e) => HandleChangeInputs(e, setFinalDate)}
            />
          </div>
        </div>
        <div className={styles.btnSubmitSearchDiv}>
          <input
            className={styles.buttonSubmit}
            label={"Pesquisar"}
            type={"button"}
            name={"buttonSubmit"}
            onClick={() =>
              HandleSearchSales(
                initDate,
                finalDate,
                setSearchFailInit,
                setInitDate,
                setFinalDate,
                setSearchFailFinal,
                setSearchFailInitBigFinal,
                allJson,
                setSearchComplete,
                setShowSearch
              )
            }
          />
          <p className={styles.buttonSubmitP}>Pesquisar</p>
        </div>
        <div className={styles.btnresetSearchDiv}>
          <ButtonSave
            type={"reset"}
            name={"btnSearchFormReset"}
            textButton={"Limpar"}
            colorBg={"colorBgSellFinishReset"}
            colorText={"colorTextSellFinishReset"}
            eClick={() => handleReset(setInitDate, setFinalDate)}
          />
        </div>
        <div className={styles.btnBackSearchDiv}>
          <ButtonSave
            name={"btnSearchFormBack"}
            textButton={"Voltar"}
            colorBg={"colorBgSellManager"}
            colorText={"colorTextSellManager"}
            eClick={hideDiv}
          />
        </div>
      </form>
      <DraggableDialog
        open={searchFailInit}
        handleClose={() => SetBooleanFalse(setSearchFailInit)}
        titleText="Falha na pesquisa"
        dialogBox="Não foi especficada a data inicial"
      />
      <DraggableDialog
        open={searchFailFinal}
        handleClose={() => SetBooleanFalse(setSearchFailFinal)}
        titleText="Falha na pesquisa"
        dialogBox="Não foi especficada a data final"
      />
      <DraggableDialog
        open={searchFailBoth}
        handleClose={() => SetBooleanFalse(setSearchFailBoth)}
        titleText="Falha na pesquisa"
        dialogBox="Não foi especficada nenhuma data"
      />
      <DraggableDialog
        open={searchFailInitBigFinal}
        handleClose={() => SetBooleanFalse(setSearchFailInitBigFinal)}
        titleText="Falha na pesquisa"
        dialogBox="A data inicial é mais recente que a data final"
      />
      <ShowSearchSales
        showHide={showHide}
        searchComplete={searchComplete}
        setShowSearch={setShowSearch}
        setPrintSuportData={setPrintSuportData}
      />
    </div>
  );
}

export default SearchSales;
