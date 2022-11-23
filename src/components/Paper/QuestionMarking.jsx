import { useEffect, useState } from "react";

export function QuestionMarking({ question, onUpdate }) {
  const [answers, setAnswers] = useState([]);
  const [defaultScore, setDefaultScore] = useState(0);
  const [wrongAttemptScore, SetWrongAttemptScore] = useState(0);

  useEffect(() => {
    if (question.defaultScore) {
      setDefaultScore(question.defaultScore);
    } else {
      setDefaultScore(0);
    }
    if (question.wrongAttemptScore) {
      SetWrongAttemptScore(question.wrongAttemptScore);
    } else {
      SetWrongAttemptScore(0);
    }
  }, [question]);

  function handleAddAnswer() {
    setAnswers((prev) => [...prev, { value: "" }]);
  }

  function handleRemoveAnswer(answerIndex) {
    console.log(answerIndex);
    setAnswers((prev) => prev.filter((_val, index) => index !== answerIndex));
  }

  function handleSave() {
    const data = { ...question };
    data.answers = answers;
    data.defaultScore = defaultScore;
    data.wrongAttemptScore = wrongAttemptScore;
    onUpdate(data);
  }

  useEffect(() => {
    if (question.answers) {
      setAnswers(question.answers);
    }
    if (question.defaultScore) {
      setDefaultScore(question.defaultScore);
    }
  }, [question]);

  return (
    <div>
      <div className="border p-2">
        <label>Suggestions</label>
        <div className="row">
          {question.suggestedAnswers.map((ans, index) => (
            <div className="py-1 col-6" key={index}>
              <span>{ans.value}</span>
              <span className="badge bg-danger">{ans.score}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="my-2">
        <label className="form-label">
          Please enter comma seperated correct option combinations and
          percentage score
        </label>

        {answers.map((ans, index) => (
          <div className="p-2 d-flex gap-2" key={index}>
            <input
              className="form-control"
              placeholder="Answer"
              value={ans.value}
              onChange={(e) =>
                setAnswers((prev) =>
                  prev.map((_ans, i) =>
                    i === index ? { ..._ans, value: e.target.value } : _ans
                  )
                )
              }
            />
            <input
              type={"number"}
              className="form-control"
              placeholder="Score"
              value={ans.score}
              onChange={(e) =>
                setAnswers((prev) =>
                  prev.map((_ans, i) =>
                    i === index ? { ..._ans, score: e.target.value } : _ans
                  )
                )
              }
            />
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleRemoveAnswer(index)}
            >
              remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-secondary d-block"
          onClick={handleAddAnswer}
        >
          Add Answer
        </button>
      </div>

      <div>
        <label>Please Enter Score for wrong answer</label>
        <input
          type={"number"}
          className="form-control"
          value={wrongAttemptScore}
          onChange={(e) => SetWrongAttemptScore(e.target.value)}
        />

        <label>Please Enter Default Score</label>
        <input
          type={"number"}
          className="form-control"
          value={defaultScore}
          onChange={(e) => setDefaultScore(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mt-2" onClick={handleSave}>
        Update Question
      </button>
    </div>
  );
}
