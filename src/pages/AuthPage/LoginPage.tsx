import styles from "./AuthPage.module.css";
import { useState } from "react";
import { loginUser } from "../../utils/auth.ts";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const login = async () => {
    const response = await loginUser({
      email,
      password,
    });

    if (response.success) navigate("/");
    if (!response.success && response.error) setError(response.error);
  };
  return (
    <div className={styles.authBlock}>
      <div className={styles.inputBlock}>
        <p>Почта</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ivan@ivan.ivan"
          type="email"
        />
      </div>
      <div className={styles.inputBlock}>
        <p>Пароль</p>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </div>

      <p className={styles.error}>{error}</p>

      <button className={styles.entryButton} onClick={() => login()}>
        Войти
      </button>
    </div>
  );
}
