import styles from "./ButtonSave.module.css";
function ButtonSave({ textButton, type, colorBg, colorText, name, eClick }) {
  return (
    <div>
      <button
        className={`${styles.inputStyles} ${styles[colorBg]} ${styles[colorText]}`}
        type={type}
        id={name}
        name={name}
        onClick={() => eClick(name)}
      >
        <p>{textButton}</p>
      </button>
    </div>
  );
}

export default ButtonSave;
