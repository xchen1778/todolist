import { configureStore } from "@reduxjs/toolkit";
import todos from "./todos";
import theme from "./theme";

export default configureStore({
  reducer: {
    todos,
    theme,
  },
});
