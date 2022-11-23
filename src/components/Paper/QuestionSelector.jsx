import { useEffect, useState } from "react";
import { searchQuestion } from "../../api.js";

export default function QuestionSelector({
  selectedQuestions,
  setSelectedQuestions,
}) {
  const [questionSearchText, setQuestionSearchText] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await searchQuestion(questionSearchText);
        setQuestions(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [questionSearchText]);

  function toggleQuestionSelection(question) {
    const isQuestionSelected =
      selectedQuestions.findIndex((q) => q.id == question.id) !== -1;

    if (isQuestionSelected) {
      setSelectedQuestions((prev) => prev.filter((q) => q.id !== question.id));
    } else {
      setSelectedQuestions((prev) => [...prev, question]);
    }
  }

  function isQuestionSelected(questionId) {
    return selectedQuestions.findIndex((q) => q.id === questionId) !== -1;
  }

  return (
    <div>
      <div>
        <input
          className="form-control"
          placeholder="search question"
          value={questionSearchText}
          onChange={(e) => setQuestionSearchText(e.target.value)}
        />
      </div>
      <div>
        {questions.map((question) => (
          <div key={question.id}>
            <input
              type={"checkbox"}
              className="form-check-input"
              checked={isQuestionSelected(question.id)}
              onChange={() => toggleQuestionSelection(question)}
            />
            <label
              className="form-check-label cursor-pointer"
              onClick={() => toggleQuestionSelection(question)}
            >
              {question.question}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
