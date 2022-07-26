import styles from "./HomeServiceOrder.module.css";
import ButtonSave from "../../templates/ButtonSave";
import InputRegClient from "../../templates/InputRegClient";
import TextArea from "../../templates/TextArea";

function HomeServiceOrder() {
  return (
    <div className={styles.containerHome}>
      <div id="form1" className={styles.divFormStyles}>
        <form>
          <div className={styles.divH2Styles}>
            <div className={styles.divTopMakeOsStyles}>
              <div>
                <h2>Criar Ordem de Serviço</h2>
              </div>
              <div className={styles.buttonFindClient}>
                <ButtonSave
                  textButton={"Pesquisar Cliente"}
                  colorBg={"colorBgFindCliente"}
                  colorText={"colorTextFindClient"}
                  className={styles.buttonClient}
                />
              </div>
            </div>
          </div>
          <div>
            <InputRegClient
              type={"text"}
              placeholder={"Digite o nome aqui"}
              textLabel={"Nome:"}
              name={"nomeServiceOrder"}
            />
          </div>
          <div>
            <InputRegClient
              type={"number"}
              placeholder={"Digite o telefone aqui"}
              textLabel={"Telefone"}
              name={"telefoneServiceOrder"}
            />
          </div>
          <div>
            <InputRegClient
              type={"text"}
              placeholder={"Digite o equipamento deixado aqui"}
              textLabel={"Equip.:"}
              name={"equipServiceOrder"}
            />
          </div>
          <div>
            <InputRegClient
              type={"text"}
              placeholder={"Digite os acessórios deixado aqui"}
              textLabel={"Acessór.:"}
              name={"AccesServiceOrder"}
            />
          </div>
          <div>
            <TextArea
              type={"text"}
              placeholder={"Digite aqui o defeito descrito pelo cliente"}
              textLabel={"Defeito:"}
              name={"defectServiceOrder"}
              rows={"3"}
              cols={"75"}
            />
          </div>
          <div>
            <TextArea
              type={"text"}
              placeholder={"Digite aqui a observação (não será impresso na OS)"}
              textLabel={"OBS:"}
              name={"ObsServiceOrder"}
              rows={"3"}
              cols={"75"}
            />
          </div>
          <div className={styles.checkApprovedOs}>
            <div>
              <InputRegClient
                type={"checkbox"}
                textLabel={"OS. aprovado?"}
                name={"approvedOs"}
                labelStyles={"labelStylesCheckBox"}
              />
            </div>
            <div>
              <InputRegClient
                type={"number"}
                placeholder={"0000,00"}
                textLabel={"Valor Orçamento:"}
                name={"priceServiceOrder"}
                labelStyles={"labelStylesCheckBox"}
              />
            </div>
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
            <h2>Pesquisar Ordem de Serviço</h2>
          </div>
          <div>
            <InputRegClient
              type={"text"}
              placeholder={"Digite o nome aqui"}
              textLabel={"Por nome:"}
              name={"nameFindClienteOs"}
            />
          </div>
          <div>
            <InputRegClient
              type={"number"}
              placeholder={"Digite o numero da OS. aqui"}
              textLabel={"Por OS.:"}
              name={"osFindClienteOs"}
            />
          </div>
          <div className={styles.inputDate}>
            <div className={styles.divDateStyles}>
              <InputRegClient
                type={"date"}
                textLabel={"Data inicial:"}
                name={"dateIniFindClientOs"}
                labelStyles={"labelStyles"}
              />
            </div>
            <div className={styles.divDateStyles}>
              <InputRegClient
                type={"date"}
                textLabel={"Data final:"}
                name={"dateFinFindClientOs"}
                labelStyles={"labelStyles"}
              />
            </div>
          </div>
          <div className={styles.buttonStyles}>
            <ButtonSave
              type={"submit"}
              textButton={"Pesquisar OS"}
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
          <div className={styles.buttonAbandon}>
            <ButtonSave
              textButton={"Lista de Abandono"}
              colorBg={"colorBgAbandon"}
              colorText={"colorTextAbandon"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default HomeServiceOrder;
