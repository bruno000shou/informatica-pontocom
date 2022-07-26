import styles from "./HomePos.module.css";
import ButtonSave from "../../templates/ButtonSave";
import InputRegClient from "../../templates/InputRegClient";
import { useState } from "react";

function HomePos() {
  const [service, setService] = useState({
    btnServicoInformatica: false,
    btnServicoCelular: false,
    btnServicoTelevisao: false,
    btnServicosDiversos: false,
    btnProdutos: false,
    btnSaidaDevolucao: false,
  });

  function setServiceValue(name) {
    console.log(name);
  }

  // let serviceAux =
  // console.log(serviceAux);
  // setService({ btnServicoTelevisao: "true" });

  return (
    <div className={styles.sellContainer}>
      <div className={styles.sellTypeButton}>
        <div>
          <ButtonSave
            textButton={"Serviço Informática"}
            colorBg={"colorBgSell"}
            colorText={"colorTextSell"}
            name={"btnServicoInformatica"}
            eClick={setServiceValue}
          />
        </div>
        <div>
          <ButtonSave
            textButton={"Serviço Celular"}
            colorBg={"colorBgSell"}
            colorText={"colorTextSell"}
            name={"btnServicoCelular"}
            eClick={setServiceValue}
          />
        </div>
        <div>
          <ButtonSave
            textButton={"Serviço Televisão"}
            colorBg={"colorBgSell"}
            colorText={"colorTextSell"}
            name={"btnServicoTelevisao"}
            eClick={setServiceValue}
          />
        </div>
        <div>
          <ButtonSave
            textButton={"Serviços Diversos"}
            colorBg={"colorBgSell"}
            colorText={"colorTextSell"}
            name={"btnServicosDiversos"}
            eClick={setServiceValue}
          />
        </div>
        <div>
          <ButtonSave
            textButton={"Produtos"}
            colorBg={"colorBgSell"}
            colorText={"colorTextSell"}
            name={"btnProdutos"}
            eClick={setServiceValue}
          />
        </div>
        <div>
          <ButtonSave
            textButton={"Saída ou Devolução"}
            colorBg={"colorBgSellDevolution"}
            colorText={"colorTextSellDevolution"}
            name={"btnSaidaDevolucao"}
            eClick={setServiceValue}
          />
        </div>
      </div>
      <div className={styles.sellValorInput}>
        <h2>Valor total:</h2>
        <div className={styles.sellValorInputBox}>
          <InputRegClient
            type={"number"}
            name={"sellValor"}
            placeholder={"0000,00"}
          />
        </div>
        <div className={styles.payTypes}>
          <ButtonSave
            textButton={"Dinheiro"}
            colorBg={"colorBgPayTypes"}
            colorText={"colorTextPayTypes"}
          />
          <ButtonSave
            textButton={"Crédito"}
            colorBg={"colorBgPayTypes"}
            colorText={"colorTextPayTypes"}
          />
          <ButtonSave
            textButton={"Débito"}
            colorBg={"colorBgPayTypes"}
            colorText={"colorTextPayTypes"}
          />
          <ButtonSave
            textButton={"Pix"}
            colorBg={"colorBgPayTypes"}
            colorText={"colorTextPayTypes"}
          />
        </div>
        <div className={styles.sellValorInputBot}>
          <ButtonSave
            textButton={"Concluir Venda"}
            colorBg={"colorBgSellDeal"}
            colorText={"colorTextSellDeal"}
          />
          <ButtonSave
            textButton={"Limpar"}
            colorBg={"colorBgSellFinishReset"}
            colorText={"colorTextSellFinishReset"}
          />
        </div>
      </div>
      <div className={styles.sellManager}>
        <ButtonSave
          textButton={"Abrir Caixa"}
          colorBg={"colorBgSellManager"}
          colorText={"colorTextSellManager"}
        />
        <ButtonSave
          textButton={"Fechar Caixa"}
          colorBg={"colorBgSellManager"}
          colorText={"colorTextSellManager"}
        />
        <ButtonSave
          textButton={"Relatório Dia"}
          colorBg={"colorBgSellManager"}
          colorText={"colorTextSellManager"}
        />
        <ButtonSave
          textButton={"Imprimir Caixa"}
          colorBg={"colorBgSellManager"}
          colorText={"colorTextSellManager"}
        />
        <ButtonSave
          textButton={"Pesquisar Caixa"}
          colorBg={"colorBgSellManager"}
          colorText={"colorTextSellManager"}
        />
      </div>
    </div>
  );
}

export default HomePos;
