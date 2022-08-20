import styles from "./SearchSales.module.css";
import InputRegClient from "../../templates/InputRegClient";
import ButtonSave from "../../templates/ButtonSave";
import findBetween from "../../../helpers/FindBetween";
import { useState } from "react";
import React from "react";
import ShowSearchSales from "./ShowSearchSales";
import DraggableDialog from "../../templates/DraggableDialog";
import moment from "moment";

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
  // const [resetData, setResetData] = useState("");

  function hideDiv() {
    showHide = 0;
  }

  function handleInitDate(e) {
    console.log(moment(e).format("YYYYMMDD"));
    setInitDate(e);
  }

  function handleFinalDate(e) {
    setFinalDate(e);
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
      findBetween(
        allJson,
        moment(initDate).format("YYYYMMDD"),
        moment(finalDate).format("YYYYMMDD"),
        setSearchComplete
      );
      setShowSearch(2);
      handleReset();
    }
    handleReset();
    // setResetData("");
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
              value={initDate}
              name={"searchInitDate"}
              makeChange={handleInitDate}
            />
          </div>
          <div>
            <InputRegClient
              textLabel={"Data final:"}
              type={"date"}
              value={finalDate}
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
        setPrintSuportData={setPrintSuportData}
      />
    </div>
  );
}

export default SearchSales;
