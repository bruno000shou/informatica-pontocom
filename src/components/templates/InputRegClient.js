import styles from "./InputRegClient.module.css";

function InputRegClient({
  type,
  placeholder,
  textLabel,
  name,
  labelStyles,
  makeChange,
  value,
}) {
  return (
    <div className={styles.divStyles}>
      <label className={styles[labelStyles]}>{textLabel}</label>
      <input
        className={`${styles.inputStyles} ${styles[name]}`}
        type={type}
        name={name}
        placeholder={placeholder}
        id={name}
        value={value}
        onChange={(e) => {
          makeChange(e.target.value);
        }}
      ></input>
    </div>
  );
}

export default InputRegClient;
