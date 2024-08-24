import { useReducer } from "react";

function reducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return { count: 0, step: 1 };
    default:
      throw new Error("Unkown action");
  }
}

export default function Counter() {
  //   const [count, setCount] = useState(0);
  const initialState = { count: 0, step: 1 };
  const [state, disPatch] = useReducer(reducer, initialState);

  const { count, step } = state;

  function handleReset() {
    disPatch({ type: "reset" });
  }

  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    disPatch({ type: "dec" });
  };
  const inc = function () {
    disPatch({ type: "inc" });
  };
  const definStep = function (e) {
    disPatch({ type: "setStep", payload: Number(e.target.value) });
  };
  const definCount = function (e) {
    disPatch({ type: "setCount", payload: Number(e.target.value) });
    console.log(count);
  };

  return (
    <div>
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={definStep}
        />
        <span>Step: {step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input type="text" value={count} onChange={definCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>
        <span>
          {count === 0
            ? "Today is "
            : count > 0
            ? `${count} days from today is `
            : `${Math.abs(count)} days ago was `}
        </span>
        <span>{date.toDateString()}</span>
      </p>

      {count !== 0 || step !== 1 ? (
        <div>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : null}
    </div>
  );
}
