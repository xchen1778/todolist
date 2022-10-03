import { useState } from "react";

function useInput(initial) {
  const [state, setState] = useState(initial);

  function handleChange(event) {
    setState(event.target.value);
  }

  function reset() {
    setState("");
  }

  return [state, handleChange, reset];
}

export { useInput };
