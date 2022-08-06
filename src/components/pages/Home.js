import styles from "./Home.module.css";
import ButtonSave from "../templates/ButtonSave";
import React from "react";

function Home() {
  return (
    <div className={styles.homeContainer}>
      <div>
        <h1>Atividades Recentes</h1>
      </div>
      <div className={styles.homeContainerBox}>
        <div>
          <h2>Recibos Criados</h2>
        </div>
        <div>
          <h2>Ordens de Serviço Criadas</h2>
        </div>
        <div>
          <h2>Vendas Feitas</h2>
        </div>
        <div>
          <h2>Clientes Cadastrados</h2>
        </div>
        <ButtonSave
          textButton={"Abrir"}
          colorBg={"colorBgOpen"}
          colorText={"colorTextOpen"}
        />
      </div>
    </div>
  );
}

export default Home;
