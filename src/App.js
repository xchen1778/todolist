import Todolist from "./components/Todolist";
import { useSelector } from "react-redux";
import ThemeSwitch from "./components/ThemeSwitch";
import BackgroundText from "./components/BackgroundText";

function App() {
  const theme = useSelector((store) => store.theme);

  return (
    <div className="app" id={theme}>
      <BackgroundText />
      <Todolist />
      <ThemeSwitch />
    </div>
  );
}

export default App;
