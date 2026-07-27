import styles from "./Footer.module.css";
import HomeLogo from "../../../assets/home.svg?react";
import HomeFilledLogo from "../../../assets/home_filled.svg?react";

import GroupLogo from "../../../assets/group.svg?react";
import GroupFilledLogo from "../../../assets/group_filled.svg?react";

import SettingsLogo from "../../../assets/settings.svg?react";
import SettingsFilledLogo from "../../../assets/settings_filled.svg?react";

import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { path: "/", label: "Главная", Icon: HomeLogo, IconActive: HomeFilledLogo },
  {
    path: "/groups",
    label: "Сообщество",
    Icon: GroupLogo,
    IconActive: GroupFilledLogo,
  },
  {
    path: "/settings",
    label: "Настройки",
    Icon: SettingsLogo,
    IconActive: SettingsFilledLogo,
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <nav>
        {NAV_ITEMS.map(({ path, label, Icon, IconActive }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `${styles.navElement} ${isActive ? styles.active : ""}`
            }
          >
            {({ isActive }) => {
              const CurrentIcon = isActive ? IconActive : Icon;

              return (
                <>
                  <CurrentIcon className={styles.icon} />
                  <p>{label}</p>
                </>
              );
            }}
          </NavLink>
        ))}
      </nav>
    </footer>
  );
}
