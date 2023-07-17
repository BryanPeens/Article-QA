import React, { useRef, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

// 0. Install dependencies
// npm i @tensorflow/tfjs @tensorflow-models/qna react-loader-spinner

// 1. Import dependencies
import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { Fragment } from "react";

const App = () => {
  // 3. Setup references and state hooks
  const passageRef = useRef(null);
  const questionRef = useRef(null);
  const [answer, setAnswer] = useState();
  const [model, setModel] = useState(null);

  // 4. Load Tensorflow Model
  const loadModel = async () => {
    const loadedModel = await qna.load();
    setModel(loadedModel);
    console.log("Model loaded.");
  };

  // 5. Handle Questions
  const answerQuestion = async (e) => {
    if (e.which === 13 && model !== null) {
      console.log("Question submitted.");
      const passage = passageRef.current.value;
      const question = questionRef.current.value;

      const answers = await model.findAnswers(question, passage);
      setAnswer(answers);
      console.log(answers);
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  // 2. Setup input, question and result area
  return (
    <div className="App">
      <header className="App-header">
        {model == null ? (
          <div>
            <div>Model Loading</div>
            <Loader type="Triangle" color="#00BFFF" height={100} width={100} />
          </div>
        ) : (
          <React.Fragment>
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
            <div className="textarea-container">
              <textarea
                ref={passageRef}
                className="w-full flex px-4 py-2 mb-4 rounded-lg"
                rows="8"
                cols="90"
                placeholder="Your article here..."
              ></textarea>
            </div>
            <div className="flex items-center question-input">
              <span className="mr-2">Ask a Question:</span>
              <input
                ref={questionRef}
                onKeyPress={answerQuestion}
                className="flex-grow px-4 py-2 rounded-lg"
              ></input>
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
