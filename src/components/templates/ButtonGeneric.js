import styles from "./ButtonSave.module.css";
import React from "react";

function ButtonGeneric({
  textButton,
  type,
  colorBg,
  colorText,
  name,
  focus,
  event,
}) {
  return (
    <div>
      <button
        className={`${styles.inputStyles} 
        ${focus ? styles[colorBg + "Focus"] : styles[colorBg]} 
        ${styles[colorText]}`}
        type={type}
        id={name}
        name={name}
        // onClick={event}
      >
        <p>{textButton}</p>
      </button>
    </div>
  );
}

export default ButtonGeneric;
