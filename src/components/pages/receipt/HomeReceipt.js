import styles from "./HomeReceipt.module.css";
import InputRegClient from "../../templates/InputRegClient";
import ButtonSave from "../../templates/ButtonSave";
import TextArea from "../../templates/TextArea";

function HomeReceipt() {
  return (
    <div className={styles.containerHome}>
      <div id="form1" className={styles.divFormStyles}>
        <form>
          <div className={styles.divH2Styles}>
            <h2>Criar Recibo</h2>
          </div>
          <div className={styles.buttonFindClient}>
            <ButtonSave
              textButton={"Pesquisar Cliente ou OS"}
              colorBg={"colorBgFindCliente"}
              colorText={"colorTextFindClient"}
              className={styles.buttonClient}
            />
          </div>
          <div>
            <InputRegClient
              type={"text"}
              placeholder={"Digite o nome aqui"}
              textLabel={"Nome:"}
              name={"nome"}
            />
          </div>
          <div>
            <InputRegClient
              type={"number"}
              placeholder={"Digite o valor aqui"}
              textLabel={"Valor R$"}
              name={"Valor"}
            />
          </div>
          <div>
            <InputRegClient
              type={"number"}
              placeholder={"Digite o prazo de garantia aqui"}
              textLabel={"Garantia:"}
              name={"Garantia"}
            />
          </div>
          <div>
            <TextArea
              type={"text"}
              placeholder={"Digite aqui o serviço executado"}
              textLabel={"Serviço:"}
              name={"observacao"}
              rows={"10"}
              cols={"75"}
            />
          </div>
          <div className={styles.buttonStyles}>
            <ButtonSave
              type={"submit"}
              textButton={"Salvar e Imprimir"}
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
            <h2>Pesquisar Recibos</h2>
          </div>
          <div>
            <InputRegClient
              type={"text"}
              placeholder={"Digite o nome aqui"}
              textLabel={"Por nome:"}
              name={"nome"}
            />
          </div>
          <div>
            <InputRegClient
              type={"number"}
              placeholder={"Digite o numero aqui"}
              textLabel={"Por numero:"}
              name={"telefone"}
            />
          </div>
          <div className={styles.inputDate}>
            <div className={styles.divDateStyles}>
              <InputRegClient
                type={"date"}
                textLabel={"Data inicial:"}
                name={"dateIni"}
                labelStyles={"labelStyles"}
              />
            </div>
            <div className={styles.divDateStyles}>
              <InputRegClient
                type={"date"}
                textLabel={"Data final:"}
                name={"dateIni"}
                labelStyles={"labelStyles"}
              />
            </div>
          </div>
          <div className={styles.buttonStyles}>
            <ButtonSave
              type={"submit"}
              textButton={"Pesquisar recibo"}
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

export default HomeReceipt;
