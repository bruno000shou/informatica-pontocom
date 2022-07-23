import styles from "./ButtonSave.module.css";
function ButtonSave({ textButton, type, colorBg, colorText }) {
  return (
    <div>
      <button
        className={`${styles.inputStyles} ${styles[colorBg]} ${styles[colorText]}`}
        type={type}
      >
        <p>{textButton}</p>
      </button>
    </div>
  );
}

export default ButtonSave;
