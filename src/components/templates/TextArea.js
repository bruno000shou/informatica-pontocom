import styles from "./TextArea.module.css";
import React from "react";

function TextArea({
  type,
  placeholder,
  textLabel,
  name,
  rows,
  cols,
  onChange,
  textContent,
}) {
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
        onChange={onChange}
      >
        {textContent}
      </textarea>
    </div>
  );
}

export default TextArea;
