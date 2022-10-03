import Todolist from "./components/Todolist";
import { useSelector } from "react-redux";
import ThemeSwitch from "./components/ThemeSwitch";

function App() {
  const theme = useSelector((store) => store.theme);
  return (
    <div className="app" id={theme}>
      <Todolist />
      <ThemeSwitch />
    </div>
  );
}

export default App;
