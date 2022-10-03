import { useSelector, useDispatch } from "react-redux";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { setTheme } from "../redux/theme";

function ThemeSwitch() {
  const theme = useSelector((store) => store.theme);
  const dispatch = useDispatch();

  return (
    <div className="themeswitch">
      <LightModeIcon
        className={`light ${theme === "light" ? "light-active" : ""}`}
        onClick={() => {
          dispatch(setTheme("light"));
          window.localStorage.setItem("mode", JSON.stringify("light"));
        }}
      />
      <DarkModeIcon
        className={`dark ${theme === "dark" ? "dark-active" : ""}`}
        onClick={() => {
          dispatch(setTheme("dark"));
          window.localStorage.setItem("mode", JSON.stringify("dark"));
        }}
      />
    </div>
  );
}

export default ThemeSwitch;
