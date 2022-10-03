import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DateTime from "./DateTime";
import AddTodoForm from "./AddTodoForm";
import ListItems from "./ListItems";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { reorder } from "../redux/todos";
import { DragDropContext } from "react-beautiful-dnd";

function Todolist() {
  const [isAdding, setIsAdding] = useState(false);
  const [enableFlip, setEnableFlip] = useState(true);
  const [unmounting, setUnmounting] = useState(true);
  const todos = useSelector((store) => store.todos);
  const dispatch = useDispatch();

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    dispatch(
      reorder({
        initialState: result.source.index,
        finalIndex: result.destination.index,
      })
    );
  }

  function onDragStart() {
    setEnableFlip(false);
  }

  const emptyScreen = (
    <div className="emptyscreen">
      <img className="emptyscreen-img" src="/task.png" />
      <p className="emptyscreen-title">What will you accomplish today?</p>
    </div>
  );

  return (
    <div className="todolist">
      <div className="todolist-topsection">
        <h1 className="title">TODO LIST</h1>
        <DateTime />
      </div>
      <div className="input-section">
        {todos.length ? (
          <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <ListItems enableFlip={enableFlip} setEnableFlip={setEnableFlip} />
          </DragDropContext>
        ) : (
          emptyScreen
        )}
        {isAdding && (
          <>
            <div
              className={`dimscreen ${unmounting ? "unmount" : "mount"}`}
              onClick={() => {
                setUnmounting(!unmounting);
                setTimeout(() => {
                  setIsAdding(!isAdding);
                }, 300);
              }}
            ></div>
            <AddTodoForm
              isAdding={isAdding}
              setIsAdding={setIsAdding}
              data-flip-root-id="flipRoot"
              unmounting={unmounting}
              setUnmounting={setUnmounting}
            />
          </>
        )}

        <button
          onClick={() => {
            setUnmounting(!unmounting);

            setTimeout(
              () => {
                setIsAdding(!isAdding);
              },
              isAdding ? 300 : 0
            );
          }}
          className={`addbutton ${unmounting ? "" : "addactive"}`}
        >
          {unmounting ? <AddIcon /> : <ClearIcon />}
        </button>
      </div>
    </div>
  );
}

export default Todolist;
