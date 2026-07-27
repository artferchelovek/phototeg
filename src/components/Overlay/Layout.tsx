import { Outlet } from "react-router-dom";
import Header from "./Header/Header.tsx";
import Footer from "./Footer/Footer.tsx";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
