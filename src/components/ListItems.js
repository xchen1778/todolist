import { useSelector } from "react-redux";
import ListItem from "./ListItem";
import { Droppable } from "react-beautiful-dnd";
import { useFlip, FlipProvider } from "react-easy-flip";
import { useEffect, useState } from "react";

function ListItems({ enableFlip, setEnableFlip }) {
  const todos = useSelector((store) => store.todos);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 700 ? true : false
  );
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const todoItemsId = "flip-todo-items";

  useEffect(() => {
    if (enableFlip === false) {
      setEnableFlip(true);
    }
  }, [todos]);

  useFlip(todoItemsId, {
    duration: enableFlip ? 300 : 0,
  });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setIsMobile(window.innerWidth < 700 ? true : false);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <FlipProvider>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            className="listitems"
            ref={provided.innerRef}
            data-flip-root-id={todoItemsId}
            {...provided.droppadbleProps}
          >
            {todos.map((todo, index) => (
              <ListItem
                key={todo.id}
                index={index}
                isMobile={isMobile}
                {...todo}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </FlipProvider>
  );
}

export default ListItems;
