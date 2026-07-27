import styles from "./Header.module.css";
import ProfileLogo from "../../../assets/person.svg?react";

export default function Header() {
  return (
    <header className={styles.header}>
      <p className={styles.title}>Phototeg</p>
      <div className={styles.profile}>
        <ProfileLogo fill={"var(--md-sys-color-on-secondary-container)"} />
      </div>
    </header>
  );
}
