import Clock from "react-live-clock";
import styles from "./HeaderBar.module.css";
import Navbar from "./Navbar";

function HeaderBar() {
  return (
    <div className={styles.headerStyles}>
      <h1>Informatica.com</h1>
      <div>
        <Navbar />
      </div>
      <div className={styles.clock}>
        <Clock
          format={"dddd, MMMM Mo, YYYY, h:mm:ss A"}
          ticking={true}
          timezone={"America/Sao_Paulo"}
        />
      </div>
    </div>
  );
}

export default HeaderBar;
