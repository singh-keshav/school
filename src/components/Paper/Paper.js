import { useEffect, useState } from "react";
import { createPaper, updatePaper } from "../../api.js";
import QuestionSelector from "./QuestionSelector";
import { QuestionFormatOne } from "./QuestionFormatOne";
import { QuestionMarking } from "./QuestionMarking";
import PaperSelector from "./PaperSelector";
import { toast } from "react-toastify";

export default function Paper() {
  const [paperName, setPaperName] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState();
  const [allowedDuration, setAllowedDuration] = useState(0);
  const [instructions, setInstructions] = useState('');

  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);

  const [selectedPaper, setSelectedPaper] = useState(null);
  const [selectedTab, setSelectedTab] = useState("paper");

  useEffect(() => {
    if (selectedPaper) {
      setPaperName(selectedPaper.paperName);
      setStartDateTime(selectedPaper.startDateTime);
      setEndDateTime(selectedPaper.endDateTime);
      setAllowedDuration(selectedPaper.allowedDuration);
      setSelectedQuestions(selectedPaper.questions);
    }
  }, [selectedPaper]);

  async function handleSavePaper() {
    // const pendingQuestions = selectedQuestions.filter(q => q.defaultScore && q.wrongAttemptScore)
    try {
      const payload = {
        paperName,
        questions: selectedQuestions,
        startDateTime,
        endDateTime,
        allowedDuration,
        instructions
      };

      let response;

      if (selectedPaper && selectedPaper.id) {
        payload.id = selectedPaper.id;
        response = await updatePaper(payload);
      } else {
        response = await createPaper(payload);
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  function handleQuestionUpdate(q) {
    // Todo: check why this not working
    // setActiveQuestion(null);
    setSelectedQuestions((prev) =>
      prev.map((_q) => {
        if (_q.id === q.id) {
          return q;
        }
        return _q;
      })
    );

    toast('Question Updated', { hideProgressBar: true, type: 'success', autoClose: true })
  }

  return (
    <div className="row">
      <div className="col-4 px-2">
        <div className="d-flex">
          <button
            className="btn col-6"
            onClick={() => setSelectedTab("question")}
          >
            Question
          </button>
          <button
            className="btn col-6"
            onClick={() => setSelectedTab("paper")}
          >
            Paper
          </button>
        </div>
        <div className="mx-2">
          {selectedTab === "question" && (
            <QuestionSelector
              selectedQuestions={selectedQuestions}
              setSelectedQuestions={setSelectedQuestions}
            />
          )}
          {selectedTab === "paper" && (
            <PaperSelector
              selectedPaper={selectedPaper}
              setSelectedPaper={setSelectedPaper}
            />
          )}
        </div>
      </div>
      <div className="col-8">
        <div className="row">
          <div className="col-sm-6">
            <label>Paper Name</label>
            <input
              className="form-control"
              value={paperName}
              placeholder="Paper name"
              onChange={(e) => setPaperName(e.target.value)}
            />
          </div>
          <div className="col-sm-6">
            <label>Start Time</label>
            <input
              className="form-control"
              type={"datetime-local"}
              value={startDateTime}
              placeholder="Start Time"
              onChange={(e) => setStartDateTime(e.target.value)}
            />
          </div>
          <div className="col-sm-6">
            <label>End time</label>
            <input
              className="form-control"
              type={"datetime-local"}
              value={endDateTime}
              placeholder="End Time"
              onChange={(e) => setEndDateTime(e.target.value)}
            />
          </div>
          <div className="col-sm-6">
            <label>Allowed Duration</label>
            <input
              type={"number"}
              className="form-control"
              value={allowedDuration}
              onChange={(e) => setAllowedDuration(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label>Paper Instructions</label>
            <textarea
              className="form-control"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>
        </div>
        {selectedQuestions.map((q) => (
          <div className="" onClick={() => setActiveQuestion(q)}>
            <QuestionFormatOne question={q} key={q.id} />
            {activeQuestion && activeQuestion.id === q.id && (
              <QuestionMarking
                question={q}
                onUpdate={(q) => handleQuestionUpdate(q)}
              />
            )}
          </div>
        ))}
        <button className="btn btn-primary mt-4" onClick={handleSavePaper}>
          Save Paper
        </button>
      </div>

    </div>

  );
}
