import styles from "./TextArea.module.css";

function TextArea({ type, placeholder, textLabel, name, rows, cols }) {
  return (
    <div className={styles.divStyles}>
      <label>{textLabel}</label>
      <textarea
        className={styles.inputStyles}
        type={type}
        name={name}
        placeholder={placeholder}
        id={name}
        rows={rows}
        cols={cols}
      ></textarea>
    </div>
  );
}

export default TextArea;
