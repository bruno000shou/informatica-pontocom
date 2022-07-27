import styles from "./ButtonSave.module.css";

function ButtonSave({
  textButton,
  type,
  colorBg,
  colorText,
  name,
  eClick,
  focus,
}) {
  let altera;
  return (
    <div>
      <button
        className={`${styles.inputStyles} 
        ${focus ? styles[colorBg + "Focus"] : styles[colorBg]} 
        ${styles[colorText]}`}
        type={type}
        id={name}
        name={name}
        onClick={() => {
          eClick(name);
        }}
      >
        <p>{textButton}</p>
      </button>
    </div>
  );
}

export default ButtonSave;
