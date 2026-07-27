import styles from "./AuthPage.module.css";
import { useState } from "react";
import LoginPage from "./LoginPage.tsx";
import RegisterPage from "./RegisterPage.tsx";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  return (
    <div className={styles.authContainer}>
      <p className={styles.title}>PhotoTeg</p>
      <div className={styles.chooseLogin}>
        <p
          onClick={() => setIsLogin(true)}
          className={`${isLogin && styles.activePick}`}
        >
          Авторизация
        </p>
        <p
          onClick={() => setIsLogin(false)}
          className={`${!isLogin && styles.activePick}`}
        >
          Регистрация
        </p>
      </div>
      {isLogin ? <LoginPage /> : <RegisterPage />}
    </div>
  );
}
