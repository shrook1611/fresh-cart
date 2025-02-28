import { createContext, useState } from "react";
import React from "react";

export const CounterContext = createContext(0);

export default function CounterContextProvider(props) {
  const [counter, setCounter] = useState(0);

  return (
    <CounterContext.Provider value={{ counter }}>
      {props.children}
    </CounterContext.Provider>
  );
}
