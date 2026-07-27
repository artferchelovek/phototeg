import styles from "./AuthPage.module.css";
import { useState } from "react";
import { registerUser } from "../../utils/auth.ts";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const register = async () => {
    const response = await registerUser({
      email,
      username,
      password,
    });

    if (response.success) navigate("/");
  };
  return (
    <div className={styles.authBlock}>
      <div className={styles.inputBlock}>
        <p>Имя пользователя</p>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="ivanchik"
          type="text"
        />
      </div>
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

      <button className={styles.entryButton} onClick={() => register()}>Зарегистрироваться</button>
    </div>
  );
}
