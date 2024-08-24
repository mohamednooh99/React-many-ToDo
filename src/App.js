import { useState } from "react";
import "./App.css";
import Counter from "./count";

function App() {
  // next and prev todo increase

  const [step, setStep] = useState(1);

  function handelNext() {
    console.log("next   ");
    if (step < 3) setStep((s) => s + 1);
  }
  function handelPrev() {
    console.log("prev   ");
    if (step > 1) setStep((s) => s - 1);
  }

  return (
    // next and prev todo increase
    <div className="App">
      <div className="App">
        <h2>ToDo next prev</h2>
      </div>
      <div className="content-steps">
        <div className="steps">
          <button className={step >= 1 ? "active" : ""}> 1 </button>
          <button className={step >= 2 ? "active" : ""}> 2 </button>
          <button className={step >= 3 ? "active" : ""}> 3 </button>
        </div>
        <p> step 1 : learn React </p>
        <div className="prev-next">
          <button onClick={handelPrev} className="previous">
            {" "}
            previous{" "}
          </button>
          <button onClick={handelNext} className="next">
            {" "}
            Next{" "}
          </button>
        </div>
      </div>

      <div>
        {" "}
        <h2> flip card </h2>{" "}
      </div>
      <FlashCards />

      <div>
        {" "}
        <h2> Accordion item </h2>{" "}
      </div>

      <Accordion data={faqs} />

      <div>
        {" "}
        <h2> Bill </h2>{" "}
      </div>
      <Bill />

      <div>
        {" "}
        <h2> Counter </h2> <p> default date is "june 21 2027" </p>
      </div>
      <Counter />
    </div>
  );
}

export default App;

const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript",
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components",
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX",
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props",
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook",
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element",
  },
];

function FlashCards() {
  const [selected, setSelected] = useState(null);

  function handelClick(id) {
    setSelected(id !== selected ? id : null);
  }

  return (
    <div className="flashcards">
      {questions.map((q) => (
        <div
          key={q.id}
          onClick={() => handelClick(q.id)}
          className={q.id === selected ? "selected" : ""}
        >
          <p>{q.id === selected ? q.answer : q.question}</p>
        </div>
      ))}
    </div>
  );
}

// AccordionItem todo

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

function Accordion({ data }) {
  const [curOpen, setCurOpen] = useState(null);

  return (
    <div className="accordion">
      {data.map((el, i) => (
        <AccordionItem
          curOpen={curOpen}
          onOpen={setCurOpen}
          title={el.title}
          num={i}
          key={el.title}
        >
          {el.text}
        </AccordionItem>
      ))}
      <AccordionItem
        curOpen={curOpen}
        onOpen={setCurOpen}
        title="Test 1"
        num={22}
        key="test 1"
      >
        Allow React devloper to :<p>Brea up into components</p>
      </AccordionItem>
    </div>
  );
}

function AccordionItem({ curOpen, onOpen, num, title, children }) {
  const isOpen = num === curOpen;
  // const [isOpen, setIsOpen] = useState(false);
  function handelToggel() {
    onOpen(isOpen ? null : num);
    // setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className={`item  ${isOpen ? "open" : ""}`} onClick={handelToggel}>
      <p className="number"> {num < 9 ? `0${num + 1} ` : num + 1} </p>
      <p className="text">{title}</p>
      <p className="icon"> {isOpen ? "+" : "-"} </p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}

// calculate bill

function Bill() {
  const [bill, setBill] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);
  const tip = bill * ((percentage1 + percentage2) / 2 / 100);

  function handelReset() {
    setBill(" ");
    setPercentage1(0);
    setPercentage2(0);
  }
  return (
    <div>
      <BillInput bill={bill} onSetBill={setBill} />
      <SelectPercentage percentage={percentage1} onselect={setPercentage1}>
        {" "}
        How did you like the service ?{" "}
      </SelectPercentage>
      <SelectPercentage percentage={percentage2} onselect={setPercentage2}>
        {" "}
        How did your frined like the service ?{" "}
      </SelectPercentage>

      {bill > 0 && (
        <>
          {" "}
          <Output bill={bill} tip={tip} />
          <Reset onReset={handelReset} />
        </>
      )}
    </div>
  );
}

function BillInput({ bill, onSetBill }) {
  return (
    <div>
      <label> How Much was the bill ? </label>{" "}
      <input
        type="text"
        placeholder="Bill Value"
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
      />
    </div>
  );
}
function SelectPercentage({ children, percentage, onselect }) {
  return (
    <div>
      <label> {children} </label>
      <select
        id="rate"
        value={percentage}
        onChange={(e) => onselect(Number(e.target.value))}
      >
        <option value="0">Dissatisfied(5%)</option>
        <option value="5">t was okay (10%)</option>
        <option value="10">it was good (15%)</option>
        <option value="20">Absolutly Amazing (20%)</option>
      </select>
    </div>
  );
}
function Output({ bill, tip }) {
  return (
    <h2>
      You pay {bill + tip} (${bill} + ${tip} )
    </h2>
  );
}
function Reset({ onReset }) {
  return (
    <>
      <button onClick={onReset}> Reset </button>
    </>
  );
}
