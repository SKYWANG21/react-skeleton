import { useEffect, useState, createContext, useContext, useReducer } from "react";
import "@/assets/App.css";
import { Outlet, useNavigate } from "react-router-dom";
import React, { Suspense } from "react";

interface Count {
  count: number;
  setCount: (number) => void;
}

const numberProvider = createContext<Count | null>(null);

function Container() {
  const { count, setCount } = useContext(numberProvider) as Count;
  const [text, setText] = useState(count);
  function add1() {
    return setCount(count + 1);
  }

  useEffect(() => {
    setText(count * 2);
  }, [count]);
  return (
    <>
      <button onClick={add1}>click +1</button>
      <p style={{ color: "red" }}>
        {count}*2={text}
      </p>
    </>
  );
}

function Reducer() {
  const form = {
    name: "",
    age: "",
    sex: "",
  };

  function setForm(state, action) {
    return {
      ...state,
      [action.key]: action.value,
    };
  }

  const [state, dispatch] = useReducer(setForm, form);

  function input(e, key) {
    dispatch({ key, value: e.nativeEvent.target.value });
  }

  function submit() {
    console.log(state);
  }

  return (
    <>
      <input
        type="text"
        onInput={(e) => {
          input(e, "name");
        }}
      />
      <p>{state.name}</p>
      <input
        type="text"
        onInput={(e) => {
          input(e, "age");
        }}
      />
      <p>{state.age}</p>
      <input
        type="text"
        onInput={(e) => {
          input(e, "sex");
        }}
      />
      <p>{state.sex}</p>
      <button onClick={submit}>submit</button>
    </>
  );
}

function App() {
  const [count, setCount] = useState(5);
  const nav = useNavigate();
  return (
    <>
      <numberProvider.Provider value={{ count, setCount }}>
        <div style={{ height: "300px", backgroundColor: "yellow" }}>
          <p>
            <button
              onClick={() => {
                setCount(count + 1);
              }}
            >
              add origan
            </button>
          </p>
          <Container></Container>
        </div>
      </numberProvider.Provider>
      <Reducer></Reducer>
      <div className="w-full h-200px grid grid-cols-2">
        <button onClick={() => nav("/first")}>go first</button>
        <button onClick={() => nav("/second")}>go second</button>
        <Suspense>
          <Outlet></Outlet>
        </Suspense>
      </div>
    </>
  );
}

export default App;
