import styles from "./HomeClient.module.css";
import InputRegClient from "../../templates/InputRegClient";
import ButtonSave from "../../templates/ButtonSave";
import TextArea from "../../templates/TextArea";
import React from "react";

function HomeClient() {
  return (
    <div className={styles.containerHome}>
      <div id="form1" className={styles.divFormStyles}>
        <form>
          <div className={styles.divH2Styles}>
            <h2>Cadastro de clientes</h2>
          </div>
          <div>
            <InputRegClient
              type={"text"}
              placeholder={"Digite o nome aqui"}
              textLabel={"Nome"}
              name={"nome"}
            />
          </div>
          <div>
            <InputRegClient
              type={"number"}
              placeholder={"Digite o telefone(1) aqui"}
              textLabel={"Telefone(1)"}
              name={"telefone1"}
            />
          </div>
          <div>
            <InputRegClient
              type={"number"}
              placeholder={"Digite o telefone(2) aqui"}
              textLabel={"Telefone(2)"}
              name={"telefone2"}
            />
          </div>
          <div>
            <TextArea
              placeholder={"Digite aqui informações extras"}
              textLabel={"Extras:"}
              name={"observacao"}
              rows={"10"}
              cols={"75"}
            />
          </div>
          <div className={styles.checkWhatsapp}>
            <InputRegClient
              type={"checkbox"}
              textLabel={"Esse cliente tem whatsapp?"}
              name={"whatsapp"}
            />
          </div>
          <div className={styles.buttonStyles}>
            <ButtonSave
              type={"submit"}
              textButton={"Salvar Cadastro"}
              colorBg={"colorBgSave"}
              colorText={"colorTextSave"}
            />
            <ButtonSave
              type={"reset"}
              textButton={"Limpar dados"}
              colorBg={"colorBgReset"}
              colorText={"colorTextReset"}
            />
          </div>
        </form>
      </div>
      <div id="form2" className={styles.divFormStyles}>
        <form>
          <div className={styles.divH2Styles}>
            <h2>Pesquisar Clientes</h2>
          </div>
          <div>
            <InputRegClient
              type={"text"}
              placeholder={"Digite o nome aqui"}
              textLabel={"Por nome"}
              name={"nome"}
            />
          </div>
          <div>
            <InputRegClient
              type={"number"}
              placeholder={"Digite o telefone aqui"}
              textLabel={"Por telefone"}
              name={"telefone"}
            />
          </div>
          <div className={styles.buttonStyles}>
            <ButtonSave
              type={"submit"}
              textButton={"Pesquisar"}
              colorBg={"colorBgSave"}
              colorText={"colorTextSave"}
            />
            <ButtonSave
              type={"reset"}
              textButton={"Limpar consulta"}
              colorBg={"colorBgReset"}
              colorText={"colorTextReset"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default HomeClient;
