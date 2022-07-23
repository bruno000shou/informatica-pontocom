import styles from "./InputRegClient.module.css";

function InputRegClient({ type, placeholder, textLabel, name }) {
  return (
    <div className={styles.divStyles}>
      <label>{textLabel}</label>
      <input
        className={`${styles.inputStyles} ${styles[name]}`}
        type={type}
        name={name}
        placeholder={placeholder}
        id={name}
      ></input>
    </div>
  );
}

export default InputRegClient;
