import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { add } from "../redux/todos";
import { useInput } from "../hooks/useInput";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

function AddTodoForm({ isAdding, setIsAdding, unmounting, setUnmounting }) {
  const dispatch = useDispatch();
  const [addTodo, handleAddTodo, resetAddTodo] = useInput("");
  const currentElement = useRef();

  useEffect(() => {
    setUnmounting(false);
    currentElement.current.focus();
  }, [isAdding]);

  function handleCancelAdding(event) {
    event.preventDefault();
    resetAddTodo();
    setUnmounting(true);
    setTimeout(() => {
      setIsAdding(false);
    }, 300);
  }

  function handleAdd(event) {
    event.preventDefault();
    if (addTodo) {
      dispatch(add({ newTask: addTodo }));
      resetAddTodo();
    }
    setUnmounting(true);
    setTimeout(() => {
      setIsAdding(false);
    }, 300);
  }

  return (
    <form className={`addtodoform ${unmounting ? "unmount" : "mount"}`}>
      <input
        type="text"
        placeholder="New Task"
        className="addtodoinput"
        value={addTodo}
        onChange={handleAddTodo}
        ref={currentElement}
      />
      <div className="addbuttons">
        <button onClick={handleAdd}>
          <CheckIcon />
        </button>
        <button onClick={handleCancelAdding}>
          <ClearIcon />
        </button>
      </div>
    </form>
  );
}

export default AddTodoForm;
