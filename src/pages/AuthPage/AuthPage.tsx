import styles from "./AuthPage.module.css";
import { useState } from "react";
import LoginPage from "./LoginPage.tsx";
import RegisterPage from "./RegisterPage.tsx";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  return (
    <div className={styles.authContainer}>
      <div className={styles.chooseLogin}>
        <p onClick={() => setIsLogin(true)}>Авторизация</p>
        <p onClick={() => setIsLogin(false)}>Регистрация</p>
      </div>
      {isLogin ? <LoginPage /> : <RegisterPage />}
    </div>
  );
}
