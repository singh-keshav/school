import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPaper, getPaperResponse } from "../../api";

function calculateMarks(questions = [], responses = []) {
  const responseMappedByQuestionId = {};
  responses.map((res) => (responseMappedByQuestionId[res.questionId] = res));

  questions.forEach(ques=>{
    
  })
}

export function Result() {
  const [paper, setPaper] = useState(null);
  const [paperResponses, setPaperResponses] = useState(null);

  const { paperId, responseId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const [{ data: paperdata }, { data: responseData }] = await Promise.all(
          [getPaper(paperId), getPaperResponse(responseId)]
        );
        setPaper(paperdata);
        setPaperResponses(responseData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  console.log(paper, paperResponses);
  return <div>Result</div>;
}
