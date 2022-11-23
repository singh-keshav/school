import { useEffect, useState } from "react";
import { searchPaper } from "../../api.js";

export default function PaperSelector({ selectedPaper, setSelectedPaper }) {
  const [paperSearchText, setPaperSearchText] = useState("");
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await searchPaper(paperSearchText);
        setPapers(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [paperSearchText]);

  return (
    <div>
      <div>
        <input
          className="form-control"
          placeholder="search paper"
          value={paperSearchText}
          onChange={(e) => setPaperSearchText(e.target.value)}
        />
      </div>
      <div>
        {papers.map((paper) => (
          <div key={paper.id}>
            <div onClick={() => setSelectedPaper(paper)}>{paper.paperName}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
