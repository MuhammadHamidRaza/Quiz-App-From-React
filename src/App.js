import "./App.css";
import { useState, useEffect } from "react";
import Option from "./view/option";
import Question from "./view/Question";
import Score from "./view/score";

function App() {
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [currentindex, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(30);
  const [timing ,setTiming] =useState(true)

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (minute > 0 || second > 0) {
        if (second === 0) {
          setMinute(minute - 1);
          setSecond(59);
        } else {
          setSecond(second - 1);
        }
      } else {
        setTiming(true); 
        setShowResult(true);
        setClickedOption(null)
      }
    }, 1000);
  
    return () => clearTimeout(timeout);
  }, [minute, second]);
  

  function getData() {
    fetch(
      "https://the-trivia-api.com/v2/questions?categories=science_and_nature&limit=10&difficulty=easy",
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setQuestions(res);
        setOptions(
          shuffle([
            ...res[currentindex].incorrectAnswers,
            res[currentindex].correctAnswer,
          ]),
        );
      });
  }

  function opt() {
    setOptions(
      shuffle([
        ...questions[currentindex + 1].incorrectAnswers,
        questions[currentindex + 1].correctAnswer,
      ]),
    );
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function nextBtn() {
    updateScore();
    if (currentindex < questions.length - 1) {
      console.log(clickedOption);
      setClickedOption(null);
      setIndex(currentindex + 1);
      opt();
    } else {
      setClickedOption(null)

      setTiming(false);
      setMinute(0);
      setSecond(0);
      setShowResult(true); // Move this line inside the else block
    }
  }
  

  function updateScore() {
    if (clickedOption === questions[currentindex].correctAnswer) {
      setScore(score + 10);
    }
  }

  function restart() {
    setIndex(0);
    setScore(0);
    setShowResult(false);
    setMinute(0);
    setSecond(30);
  }

  return (
    <div>
      <p className="heading-txt">Todo App</p>
      <div className="timer">
        {minute === 0 && second === 0 ? (
         timing && <div className="tim">Times Up</div>

        ) : (
          <div>
            Time left: {minute}:{second < 10 ? "0" : ""}{second}
          </div>
        )}
      </div>
      {questions.length ? (
        <div className="container">
          {showResult ? (
            <Score questions={questions} restart={restart} score={score} />
          ) : (
            <>
              <Question questions={questions} currentindex={currentindex} />
              <Option
                options={options}
                clickedOption={clickedOption}
                setClickedOption={setClickedOption}
              />
              <button onClick={nextBtn} id="next-button">
                Next
              </button>
            </>
          )}
        </div>
      ) : (
        <div>...Loading</div>
      )}
    </div>
  );
}

export default App;