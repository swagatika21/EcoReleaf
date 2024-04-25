import React, { useState } from "react";
import Context from "./Context";

function ContextHolder(props) {
  const [login,setLogin] = useState(false);
  const [data, setData] = useState();


  return (
    <Context.Provider
      value={{login,setLogin,data, setData }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default ContextHolder;