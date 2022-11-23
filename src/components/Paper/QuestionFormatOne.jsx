import { QuestionMarking } from "./QuestionMarking";

export function QuestionFormatOne({ question }) {
  return (
    <div className="row my-2">
      <div className="col-12 ">
        <div className="p-2 bg-secondary text-white  rounded">{question.question}</div>
      </div>
      {question.options.map((op, index) => (
        <div className="col-6 mt-2" key={index}>
          <div className="p-1">
            {index + 1} {op.value}
          </div>
        </div>
      ))}
    </div>
  );
}
