import styles from "./SearchSales.module.css";
import InputRegClient from "../../templates/InputRegClient";
import ButtonSave from "../../templates/ButtonSave";
import findBetween from "../../../helpers/FindBetween";
import { useState } from "react";
import React from "react";

function SearchSales({ allJson, showHide, setShowSearch, setSearchComplete }) {
  const [initDate, setInitDate] = useState();
  const [finalDate, setFinalDate] = useState();

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
      handleReset();
    } else if (finalDate === "" && initDate !== "") {
      console.log("Nao foi escolhida uma data final");
      handleReset();
    } else if (finalDate === "" && initDate === "") {
      console.log(
        "Nenhuma data foi escolhida, escolha as datas e refaça a pesquisa"
      );
      handleReset();
    } else if (initDate > finalDate) {
      console.log(
        "A data inicial e mais recente que a data final, refaça a pesquisa"
      );
      handleReset();
    } else {
      console.log("Pesquisa feita com sucesso");
      findBetween(allJson, initDate, finalDate, setSearchComplete);
      handleReset();
      setShowSearch(2);
      //TEMOS QUE EXECUTAR AQUI O PAINEL LATERAL QUE IRA PARA O SHOWSEARCHSALES
    }
  }

  function handleReset() {
    setInitDate("");
    setFinalDate("");
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
              name={"searchInitDate"}
              makeChange={handleInitDate}
            />
          </div>
          <div>
            <InputRegClient
              textLabel={"Data final:"}
              type={"date"}
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
    </div>
  );
}

export default SearchSales;
