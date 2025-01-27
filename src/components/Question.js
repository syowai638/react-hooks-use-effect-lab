import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // If timeRemaining reaches 0, reset it and trigger the onAnswered callback with false
    if (timeRemaining === 0) {
      setTimeRemaining(10); // Reset the timer to 10 seconds
      onAnswered(false); // Call onAnswered with false when time runs out
      return; // Exit the effect if timeRemaining is 0
    }

    // Set up the timer
    const timer = setTimeout(() => {
      setTimeRemaining(timeRemaining - 1); // Decrease time by 1 every second
    }, 1000);

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timer);

  }, [timeRemaining, onAnswered]); // Re-run the effect when timeRemaining or onAnswered changes

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset timer after answering
    onAnswered(isCorrect); // Trigger onAnswered callback with the result
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;

