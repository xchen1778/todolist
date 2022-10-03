import { useState } from "react";
import EditTodoForm from "./EditTodoForm";
import { useDispatch } from "react-redux";
import { remove, finish } from "../redux/todos";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CreateIcon from "@mui/icons-material/Create";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Draggable } from "react-beautiful-dnd";

const ListItem = ({ id, task, isFinished, index, isMobile }) => {
  const dispatch = useDispatch();
  const [isHovering, setIsHovering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEditing ? (
            <EditTodoForm id={id} task={task} setIsEditing={setIsEditing} />
          ) : (
            <div
              className="listitem"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={() => {
                dispatch(finish({ todoId: id }));
                setIsHovering(false);
              }}
              data-flip-id={`flip-id-${id}`}
            >
              <div className={`${isFinished ? "entry finished" : "entry"}`}>
                {isHovering && <DragIndicatorIcon className="dragbutton" />}
                {isFinished ? (
                  <CheckCircleOutlineIcon className="radiobutton" />
                ) : (
                  <RadioButtonUncheckedIcon className="radiobutton" />
                )}
                <span>{task}</span>
              </div>
              {(isHovering || isMobile) && (
                <div className="entry-buttons">
                  {!isFinished && (
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        setIsEditing(true);
                      }}
                      className="editbutton"
                    >
                      <CreateIcon />
                    </button>
                  )}
                  <button
                    onClick={() => dispatch(remove({ todoId: id }))}
                    className="deletebutton"
                  >
                    <HighlightOffIcon />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default ListItem;
