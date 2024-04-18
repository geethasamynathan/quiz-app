import { useCallback, useState, useRef } from "react";
import QUESTIONS from "../questions";
import quizCompleteImag from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import Question from "./Question";
export default function Quiz() {
  const [answerState, setAnswerState] = useState(""); //step 1
  const [userAnswers, setUserAnswers] = useState([]);
  //const activeQuestionIndex=userAnswers.length;
  //step 4
  const activeQuestionIndex =
    answerState == "" ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered"); //step 2
      setUserAnswers((prevanswer) => {
        return [...prevanswer, selectedAnswer];
      });
      //step 3
      console.log("selectedAnswer" + selectedAnswer);
      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        //step5
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );
  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImag} alt="quiz-complete" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <>
      <div id="quiz">
        <div id="question">
          <QuestionTimer
            key={activeQuestionIndex}
            timeout={10000}
            onTimeOut={handleSkipAnswer}
          />
          <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
          <ul id="answers">
            {shuffledAnswers.map((answer) => {
              //step 6
              const isSelected = userAnswers[userAnswers.length - 1] === answer;
              let cssClass = "";
              if (answerState === "answered" && isSelected) {
                cssClass = "selected";
              }
              if (
                (answerState === "correct" || answerState === "wrong") &&
                isSelected
              ) {
                cssClass = answerState;
              }
              return (
                <li key={answer} className="answer">
                  <button
                    onClick={() => handleSelectAnswer(answer)}
                    className={cssClass}
                  >
                    {answer}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
