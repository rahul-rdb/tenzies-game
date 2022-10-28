import "./App.css";
import Die from "./Components/Die";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  
  function getDieArray() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allDiceSets() {
    const diceArray = [];
    for (let i = 0; i < 10; i++) {
      diceArray.push(getDieArray());
    }
    return diceArray;
  }

  const [dice, setdice] = useState(allDiceSets());
  const [tenzies, settenzies] = useState(false);

  const diceNumbers = dice.map((n) => (
    <Die
      key={n.id}
      value={n.value}
      isHeld={n.isHeld}
      holdDice={() => holdDice(n.id)}
    />
  ));

  function rollDice() {
    if (!tenzies) {
      setdice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : getDieArray();
        })
      );
    } else {
      settenzies(false);
      setdice(allDiceSets());
    }
  }

  function holdDice(id) {
    setdice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      settenzies(true);
    }
  }, [dice]);

  return (
    <div className="app">
      <main>
        {tenzies && <Confetti />}
        <h1>Tenzies</h1>
        <p>
          Roll until all dies are the same. Click each die to freez it at it's
          current value between rolls.
        </p>
        <div className="dice--container">{diceNumbers}</div>
        <h2 style={{ color: "rgb(202, 42, 42)" }}>
          {tenzies ? "Congratulations!!! You Win 🏆 !!!" : ""}
        </h2>
        <button className="roll--dice" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </main>
    </div>
  );
}

export default App;
