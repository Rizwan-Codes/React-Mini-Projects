import { useEffect, useState } from "react";

function CircularTimer({ timer, totalTime }) {
  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  const progress = timer / totalTime;
  const strokeDashoffset = circumference - progress * circumference;
  const strokeColor = timer <= 4 ? "#EF4444" : "#F59E0B";

  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 64 64">
        <circle
          cx="32"
          cy="32"
          r={radius}
          className="text-[#2B3548]"
          strokeWidth="5"
          stroke="currentColor"
          fill="transparent"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke={strokeColor}
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      <span className="absolute text-xl font-bold text-white">{timer}</span>
    </div>
  );
}

function App() {
  const Questions = [
    {
      id: 1,
      question: "Which hook lets you run side effects in a function component?",
      option_a: "useMemo",
      option_b: "useState",
      option_c: "useEffect",
      option_d: "useRef",
      correct: "c",
    },
    {
      id: 2,
      question: "What does setInterval return in the browser?",
      option_a: "A Promise",
      option_b: "An interval ID used to clear it later",
      option_c: "The function passed to it",
      option_d: "undefined",
      correct: "b",
    },
    {
      id: 3,
      question: "In React, state updates triggered by setState are:",
      option_a: "Always synchronous",
      option_b: "Always immediate and blocking",
      option_c: "Often batched and asynchronous",
      option_d: "Not allowed inside event handlers",
      correct: "c",
    },
    {
      id: 4,
      question:
        "Which array method creates a new array without mutating the original?",
      option_a: "push()",
      option_b: "splice()",
      option_c: "sort()",
      option_d: "map()",
      correct: "d",
    },
    {
      id: 5,
      question:
        "Why must you clear an interval in useEffect's cleanup function?",
      option_a: "To make the component re-render",
      option_b:
        "To prevent multiple timers from stacking on re-render/unmount",
      option_c: "It's required by JSX syntax",
      option_d: "It has no real effect, just a convention",
      correct: "b",
    },
  ];

  const [current_ques, setcurrent_ques] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});

  const totalTime = 12;
  const [timer, setTimer] = useState(totalTime);

  // Helper to get option text by key ('a', 'b', etc.)
  const getOptionText = (q, key) => {
    if (!key) return "";
    return q[`option_${key}`];
  };

  // Next Question logic
  const handleNextQuestion = () => {
    if (current_ques < Questions.length - 1) {
      setcurrent_ques((prev) => prev + 1);
      setSelectedOption(null);
      setTimer(totalTime);
    } else {
      setQuizFinished(true);
    }
  };

  // Selection Handler
  const handleSelect = (optionkey) => {
    if (selectedOption !== null || quizFinished) return;

    setSelectedOption(optionkey);
    setUserAnswers((prev) => ({
      ...prev,
      [Questions[current_ques].id]: optionkey,
    }));

    if (optionkey === Questions[current_ques].correct) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      handleNextQuestion();
    }, 1000);
  };

  // Fixed Timer Logic
  useEffect(() => {
    if (quizFinished || selectedOption !== null) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [quizFinished, selectedOption]);

  // Handle auto-advance when timer reaches 0
  useEffect(() => {
    if (timer <= 0 && !quizFinished && selectedOption === null) {
      // Record timed out answer as null
      setUserAnswers((prev) => ({
        ...prev,
        [Questions[current_ques].id]: null,
      }));
      handleNextQuestion();
    }
  }, [timer, quizFinished, selectedOption]);

  const handleTryAgain = () => {
    setcurrent_ques(0);
    setScore(0);
    setSelectedOption(null);
    setQuizFinished(false);
    setUserAnswers({});
    setTimer(totalTime);
  };

  const getOptionClass = (optionKey) => {
    const baseClass =
      "cursor-pointer px-3 py-3 mb-2 flex items-center gap-4 rounded-lg border transition-all duration-200 select-none";

    if (quizFinished || !Questions[current_ques]) return baseClass;

    const currentCorrect = Questions[current_ques].correct;

    if (selectedOption === null) {
      return `${baseClass} bg-options border-backborder hover:bg-options/80`;
    }

    if (selectedOption === optionKey && optionKey === currentCorrect) {
      return `${baseClass} bg-green-500/20 border-green-500 text-green-200`;
    }
    if (selectedOption === optionKey && optionKey !== currentCorrect) {
      return `${baseClass} bg-red-500/20 border-red-500 text-red-200`;
    }

    if (optionKey === currentCorrect) {
      return `${baseClass} bg-green-500/10 border-green-500/50 text-green-200`;
    }

    return `${baseClass} bg-options border-backborder opacity-50`;
  };

  const percentage = Math.round((score / Questions.length) * 100);

  return (
    <div className="flex items-center justify-center bg-background w-full min-h-screen py-8">
      <div className="w-120 max-w-[95%] h-auto text-white bg-box-back p-6 rounded-2xl border border-backborder shadow-xl">
        {quizFinished ? (
          <div className="flex flex-col text-left">
            <h2 className="text-xl font-bold text-white mb-2">Quiz complete</h2>

            {/* Score & Percentage */}
            <div className="mb-6">
              <div className="text-4xl font-extrabold tracking-wide">
                {score} / {Questions.length}
              </div>
              <div className="text-sm text-gray-400 mt-0.5">
                {percentage}% correct
              </div>
            </div>

            {/* Questions Review List */}
            <div className="space-y-3 mb-6 max-h-105 overflow-y-auto pr-1">
              {Questions.map((q) => {
                const userAnsKey = userAnswers[q.id];
                const isCorrect = userAnsKey === q.correct;
                const userAnsText = userAnsKey
                  ? getOptionText(q, userAnsKey)
                  : "no answer (time ran out)";
                const correctAnsText = getOptionText(q, q.correct);

                return (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl bg-[#1E2536] border border-gray-800 text-sm leading-relaxed"
                  >
                    <div className="flex items-start gap-2.5">
                      <span
                        className={`text-base font-bold mt-0.5 ${isCorrect ? "text-green-400" : "text-red-400"
                          }`}
                      >
                        {isCorrect ? "✓" : "✕"}
                      </span>
                      <div>
                        <span className="font-semibold text-white">
                          {q.id}. {q.question}
                        </span>
                        <div className="text-xs text-gray-400 mt-1.5 flex flex-wrap gap-x-1.5">
                          <span>
                            Your answer:{" "}
                            <span
                              className={
                                isCorrect ? "text-green-300" : "text-gray-300"
                              }
                            >
                              {userAnsText}
                            </span>
                          </span>
                          {!isCorrect && (
                            <span>
                              — Correct:{" "}
                              <span className="text-gray-200 font-medium">
                                {correctAnsText}
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Yellow Try Again Button */}
            <button
              onClick={handleTryAgain}
              className="w-full py-3.5 bg-[#FFC107] hover:bg-[#FFB300] active:scale-[0.99] transition-all text-black font-semibold rounded-xl text-center shadow-md cursor-pointer"
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="text-lg">
                Question {Questions[current_ques].id}
              </div>
              <CircularTimer timer={timer} totalTime={totalTime} />
            </div>

            <div className="font-bold mb-7">
              {Questions[current_ques].question}
            </div>

            <div>
              <div
                className={getOptionClass("a")}
                onClick={() => handleSelect("a")}
              >
                <div className="w-6 h-6 bg-[#2E3548] rounded-lg text-white flex items-center justify-center text-[14px]">
                  A
                </div>
                <div>{Questions[current_ques].option_a}</div>
              </div>
              <div
                className={getOptionClass("b")}
                onClick={() => handleSelect("b")}
              >
                <div className="w-6 h-6 bg-[#2E3548] rounded-lg text-white flex items-center justify-center text-[14px]">
                  B
                </div>
                <div>{Questions[current_ques].option_b}</div>
              </div>
              <div
                className={getOptionClass("c")}
                onClick={() => handleSelect("c")}
              >
                <div className="w-6 h-6 bg-[#2E3548] rounded-lg text-white flex items-center justify-center text-[14px]">
                  C
                </div>
                <div>{Questions[current_ques].option_c}</div>
              </div>
              <div
                className={getOptionClass("d")}
                onClick={() => handleSelect("d")}
              >
                <div className="w-6 h-6 bg-[#2E3548] rounded-lg text-white flex items-center justify-center text-[14px]">
                  D
                </div>
                <div>{Questions[current_ques].option_d}</div>
              </div>
            </div>

            <div className="mt-5">Score: {score}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
