import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

function updateLocalStorage(name, item) {
  window.localStorage.setItem(name, JSON.stringify(item));
}

export const todosSlice = createSlice({
  name: "todos",
  initialState:
    JSON.parse(window.localStorage.getItem("todos"))?.sort(
      (a, b) => b.isFinished - a.isFinished
    ) || [],
  reducers: {
    add: (state, action) => {
      let newTodos = [
        { task: action.payload.newTask, isFinished: 0, id: uuidv4() },
        ...state,
      ];
      newTodos = newTodos.sort((a, b) => b.isFinished - a.isFinished);
      updateLocalStorage("todos", newTodos);
      return newTodos;
    },
    edit: (state, action) => {
      const newTodos = state.map((todo) =>
        todo.id === action.payload.todoId
          ? { ...todo, task: action.payload.editedTask }
          : todo
      );
      updateLocalStorage("todos", newTodos);
      return newTodos;
    },
    remove: (state, action) => {
      const newTodos = state.filter(
        (todo) => todo.id !== action.payload.todoId
      );
      updateLocalStorage("todos", newTodos);
      return newTodos;
    },
    finish: (state, action) => {
      const targetTodo = state.find(
        (todo) => todo.id === action.payload.todoId
      );
      let newTodos = state.map((todo) =>
        todo.id === action.payload.todoId
          ? { ...todo, isFinished: todo.isFinished === 0 ? -1 : 0 }
          : todo
      );
      newTodos = newTodos.sort((a, b) => b.isFinished - a.isFinished);
      updateLocalStorage("todos", newTodos);
      return newTodos;
    },
    reorder: (state, action) => {
      const newTodos = [...state];
      const [removed] = newTodos.splice(action.payload.initialState, 1);
      newTodos.splice(action.payload.finalIndex, 0, removed);
      updateLocalStorage("todos", newTodos);
      return newTodos;
    },
  },
});

export const { add, edit, remove, finish, reorder } = todosSlice.actions;
export default todosSlice.reducer;
