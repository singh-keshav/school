import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPaperResponse, getPaper, updatePaperResponse } from "../../api";
import { QuestionFormatOne } from "../Paper/QuestionFormatOne";
import { Timer } from "./Timer";

export function TestPaper() {
  const { id } = useParams();
  const [paper, setPaper] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [choosenAnswers, setChoosenAnswers] = useState([]);
  const [answer, setAnswer] = useState("");
  const [shouldStartTest, setShouldStartTest] = useState(false);
  // later save it in local storage
  const [paperResponse, setPaperResponse] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getPaper(id);
        console.log(response);
        setPaper(response.data);
        setSelectedQuestion(response.data.questions[0]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    const questionRespone = choosenAnswers.find(
      (ans) => ans.questionId === selectedQuestion.id
    );
    if (questionRespone) {
      setAnswer(questionRespone.answer);
    } else {
      setAnswer("");
    }
  }, [selectedQuestion, choosenAnswers]);

  if (!paper) {
    return <div>loading...</div>;
  }

  function handleQuestionAction(actionName, selectedQuestion) {
    return function () {
      const payload = {
        questionId: selectedQuestion.id,
        answer,
        paperId: paper.id,
        actionName: actionName,
      };

      const hasRespondedToQuestion =
        choosenAnswers.findIndex(
          (ans) => ans.questionId == selectedQuestion.id
        ) !== -1;

      console.log(hasRespondedToQuestion);
      if (hasRespondedToQuestion) {
        setChoosenAnswers((prev) =>
          prev.map((ans) =>
            ans.questionId == selectedQuestion.id ? payload : ans
          )
        );
      } else {
        setChoosenAnswers((prev) => [...prev, payload]);
      }
      const currentQuestionIndex = paper.questions.findIndex(
        (q) => selectedQuestion.id === q.id
      );

      setAnswer("");
      if (paper.questions.length !== currentQuestionIndex + 1) {
        setSelectedQuestion(paper.questions[currentQuestionIndex + 1]);
      }
    };
  }

  function getQuestionCircleBgColor(questionId) {
    const actionNameToColorBg = {
      save: "bg-success text-white",
      skip: "bg-danger text-white",
      "mark and save": "bg-primary text-white",
      mark: "bg-warning",
      default: "border border-dark",
    };
    const response = choosenAnswers.find(
      (ans) => ans.questionId === questionId
    );
    console.log(questionId, response);
    if (!response) {
      return actionNameToColorBg["default"];
    }
    return actionNameToColorBg[response.actionName];
  }

  async function handleStartTest() {
    // send test start time
    //
    try {
      const response = await createPaperResponse({
        hasReadInstrunctions: true,
        startTime: new Date(),
        paperId: paper.id,
        studentId: 1,
      });
      setShouldStartTest(true);
      setPaperResponse(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleEndTest() {
    await updatePaperResponse({
      ...paperResponse,
      endTime: new Date(),
      choosenAnswers,
    });

    navigate(`/test-result/${paper.id}/${paperResponse.id}`);
  }

  if (!paper) {
    return <div>loading..</div>;
  }

  if (!shouldStartTest) {
    return (
      <div>
        <div
          style={{
            textAlign: "center",
            whiteSpace: "pre-wrap",
          }}
          className="m-auto p-4 my-4"
        >
          {paper.instructions}
        </div>
        {/* <textarea className="form-control " value={paper.instructions} /> */}
        <button
          className="btn btn-primary m-auto d-block"
          onClick={handleStartTest}
        >
          Proceed
        </button>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-9">
        {selectedQuestion && (
          <div className="px-2">
            <QuestionFormatOne question={selectedQuestion} />
            <div>
              <label className="form-label">
                Please Correct options (comma seperated)
              </label>
              <input
                className="form-control"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <div className="d-flex gap-4 m-4 justify-content-end">
              <button
                className="btn btn-warning"
                onClick={handleQuestionAction("mark", selectedQuestion)}
              >
                Mark
              </button>
              <button
                className="btn btn-primary"
                onClick={handleQuestionAction(
                  "mark and save",
                  selectedQuestion
                )}
              >
                Mark and Save
              </button>
              <button
                className="btn btn-danger"
                onClick={handleQuestionAction("skip", selectedQuestion)}
              >
                Skip
              </button>
              <button
                className="btn btn-success"
                onClick={handleQuestionAction("save", selectedQuestion)}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="col-3">
        <Timer
          startTime={paperResponse.startTime}
          allowedDuration={paper.allowedDuration}
          linkExpiryDateTime={paper.endDateTime}
        />

        <div className="d-flex flex-wrap gap-4 justify-content-center border m-2 p-2 w-sm">
          {paper.questions.map((q, index) => (
            <div
              key={q.id}
              className={`d-flex justify-content-center align-items-center ${getQuestionCircleBgColor(
                q.id
              )}`}
              style={{
                height: "3rem",
                width: "3rem",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={() => setSelectedQuestion(q)}
            >
              {index + 1}
            </div>
          ))}
        </div>

        <div className="row mt-4">
          <button
            className="btn btn-danger fw-bold col-11 mx-auto"
            onClick={handleEndTest}
          >
            Submit
          </button>
        </div>

        <div></div>
      </div>
    </div>
  );
}
