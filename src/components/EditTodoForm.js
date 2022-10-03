import { useEffect, useRef } from "react";
import { useInput } from "../hooks/useInput";
import { useDispatch } from "react-redux";
import { edit, finish } from "../redux/todos";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

function EditTodoForm({ id, task, setIsEditing }) {
  const [editTodo, handleEditTodo] = useInput(task);
  const dispatch = useDispatch();
  const currentElement = useRef();

  useEffect(() => {
    console.log(currentElement);
    currentElement.current.focus();
  }, []);

  function handleCancelEditing(event) {
    event.preventDefault();
    setIsEditing(false);
  }

  function handleEdit(event) {
    event.preventDefault();
    if (editTodo) {
      dispatch(edit({ todoId: id, editedTask: editTodo }));
    }
    setIsEditing(false);
  }

  return (
    <form className="edittodoform">
      <div className="editinput">
        <RadioButtonUncheckedIcon
          className="radiobutton"
          onClick={() => {
            dispatch(finish({ todoId: id }));
            setIsEditing(false);
          }}
        />
        <input
          type="text"
          value={editTodo}
          onChange={handleEditTodo}
          className="edittodoinput"
          ref={currentElement}
        />
      </div>
      <div className="editbuttons">
        <button onClick={handleEdit}>
          <CheckIcon />
        </button>
        <button onClick={handleCancelEditing}>
          <ClearIcon />
        </button>
      </div>
    </form>
  );
}

export default EditTodoForm;
