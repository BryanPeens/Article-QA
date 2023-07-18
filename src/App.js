import React, { useRef, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { Fragment } from "react";

const App = () => {
  const passageRef = useRef(null);
  const questionRef = useRef(null);
  const [answer, setAnswer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPassageInvalid, setIsPassageInvalid] = useState(false);
  const [isQuestionInvalid, setIsQuestionInvalid] = useState(false);

  const loadModel = async () => {
    try {
      const [tf, qna] = await Promise.all([
        import("@tensorflow/tfjs"),
        import("@tensorflow-models/qna"),
      ]);
      const loadedModel = await qna.load();
      setAnswer(loadedModel);
      setIsLoading(false);
      console.log("Model loaded.");
    } catch (error) {
      setError("Failed to load the model.");
      setIsLoading(false);
      console.error(error);
    }
  };

  const answerQuestion = async () => {
    console.log("Question submitted.");
    const passage = passageRef.current.value.trim();
    const question = questionRef.current.value.trim();

    setIsPassageInvalid(passage === "");
    setIsQuestionInvalid(question === "");

    if (passage === "" || question === "") {
      setError("Please enter a passage and a question.");
      return;
    }

    try {
      const answers = await answer.findAnswers(question, passage);
      setAnswer(answers);
      console.log(answers);
    } catch (error) {
      setError("Failed to generate an answer.");
      console.error(error);
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {isLoading ? (
          <div>
            <div>Model Loading</div>
            <Loader type="Triangle" color="#00BFFF" height={100} width={100} />
          </div>
        ) : (
          <React.Fragment>
            {error ? (
              <div>{error}</div>
            ) : (
              <div className="info-section">
                <h1 className="text-4xl">Question and Answer</h1>
                <p>
                  This is a React application that uses TensorFlow.js and the Q&A
                  model to provide answers to questions based on a given passage
                  of text.
                </p>
                <p>
                  By leveraging AI techniques, the model can analyze the passage
                  and extract relevant information to provide meaningful answers
                  to user questions.
                </p>
                <p>
                  Enter an article or passage of text and ask a question. The
                  model will find answers to the question based on the provided
                  passage.
                </p>
              </div>
            )}
            <div className="textarea-container">
              <textarea
                ref={passageRef}
                className={`w-full flex px-4 py-2 mb-4 rounded-lg ${
                  isPassageInvalid ? "border-red-500" : ""
                }`}
                rows="8"
                cols="90"
                placeholder="Your article here..."
              ></textarea>
            </div>
            <div className="flex items-center question-input">
              <span className="mr-2">Ask a Question:</span>
              <input
                ref={questionRef}
                className={`flex-grow px-4 py-2 rounded-lg ${
                  isQuestionInvalid ? "border-red-500" : ""
                }`}
              ></input>
              <button
                onClick={answerQuestion}
                className="ml-2 px-4 py-2 rounded-lg bg-blue-500 text-white"
              >
                Submit
              </button>
            </div>
            <br />
            <div className="text-left">
              <h3 className="text-xl">Answers:</h3>
              {answer && answer.length > 0 ? (
                answer.map((ans, idx) => (
                  <div key={idx}>
                    <b>Answer {idx + 1} - </b> {ans.text} (
                    {Math.floor(ans.score * 100) / 100})
                  </div>
                ))
              ) : (
                <div>No answer available.</div>
              )}
            </div>
          </React.Fragment>
        )}
      </header>
    </div>
  );
};

export default App;
