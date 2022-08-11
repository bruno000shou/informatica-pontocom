import styles from "./SearchSales.module.css";
import InputRegClient from "../../templates/InputRegClient";
import ButtonSave from "../../templates/ButtonSave";
import findBetween from "../../../helpers/FindBetween";
import { useState } from "react";
import React from "react";
import ShowSearchSales from "./ShowSearchSales";
import DraggableDialog from "../../templates/DraggableDialog";

function SearchSales({
  allJson,
  showHide,
  setShowSearch,
  setSearchComplete,
  searchComplete,
}) {
  const [initDate, setInitDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [searchFailInit, setSearchFailInit] = useState(false);
  const [searchFailFinal, setSearchFailFinal] = useState(false);
  const [searchFailBoth, setSearchFailBoth] = useState(false);
  const [searchFailInitBigFinal, setSearchFailInitBigFinal] = useState(false);
  const [resetData, setResetData] = useState("");

  function hideDiv() {
    showHide = 0;
  }

  function handleInitDate(e) {
    let day = e.slice(8, 10);
    let month = e.slice(5, 7);
    let year = e.slice(0, 4);
    setInitDate(year + month + day);
  }

  function handleFinalDate(e) {
    let day = e.slice(8, 10);
    let month = e.slice(5, 7);
    let year = e.slice(0, 4);
    setFinalDate(year + month + day);
  }

  function handleSearch(e) {
    if (initDate === "" && finalDate !== "") {
      console.log("Nao foi escolhida  uma data inicial");
      handleSearchFailInit();
      handleReset();
    } else if (finalDate === "" && initDate !== "") {
      console.log("Nao foi escolhida uma data final");
      handleSearchFailFinal();
      handleReset();
    } else if (finalDate === "" && initDate === "") {
      handleSearchFailBoth();
      console.log(
        "Nenhuma data foi escolhida, escolha as datas e refaça a pesquisa"
      );
      handleReset();
    } else if (initDate > finalDate) {
      handleSearchFailInitBigFinal();
      console.log(
        "A data inicial e mais recente que a data final, refaça a pesquisa"
      );
      handleReset();
    } else {
      console.log("Pesquisa feita com sucesso");
      findBetween(allJson, initDate, finalDate, setSearchComplete);
      setShowSearch(2);
      handleReset();
    }
    handleReset();
    setResetData("");
  }

  function handleReset() {
    setInitDate("");
    setFinalDate("");
  }

  function handleSearchFailInit() {
    setSearchFailInit(true);
  }

  function handleSearchFailFinal() {
    setSearchFailFinal(true);
  }

  function handleSearchFailBoth() {
    setSearchFailFinal(true);
  }

  function handleSearchFailInitBigFinal() {
    setSearchFailInitBigFinal(true);
  }

  function handleClose() {
    setSearchFailInit(false);
    setSearchFailFinal(false);
    setSearchFailBoth(false);
    setSearchFailInitBigFinal(false);
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
              value={resetData}
              name={"searchInitDate"}
              makeChange={handleInitDate}
            />
          </div>
          <div>
            <InputRegClient
              textLabel={"Data final:"}
              type={"date"}
              value={resetData}
              name={"searchFinishDate"}
              makeChange={handleFinalDate}
            />
          </div>
        </div>
        <div className={styles.btnSubmitSearchDiv}>
          <input
            className={styles.buttonSubmit}
            label={"Pesquisar"}
            type={"button"}
            name={"buttonSubmit"}
            onClick={handleSearch}
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
            eClick={handleReset}
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
        handleClose={handleClose}
        titleText="Falha na pesquisa"
        dialogBox="Não foi especficada a data inicial"
      />
      <DraggableDialog
        open={searchFailFinal}
        handleClose={handleClose}
        titleText="Falha na pesquisa"
        dialogBox="Não foi especficada a data final"
      />
      <DraggableDialog
        open={searchFailBoth}
        handleClose={handleClose}
        titleText="Falha na pesquisa"
        dialogBox="Não foi especficada nenhuma data"
      />
      <DraggableDialog
        open={searchFailInitBigFinal}
        handleClose={handleClose}
        titleText="Falha na pesquisa"
        dialogBox="A data inicial é mais recente que a data final"
      />
      <ShowSearchSales
        showHide={showHide}
        searchComplete={searchComplete}
        setShowSearch={setShowSearch}
      />
    </div>
  );
}

export default SearchSales;
