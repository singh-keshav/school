import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchPaper } from "../../api";

export function Tests() {
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
      <div className="m-2">
        <span>Please click on any paper to start test</span>
        {papers.map((paper) => (
          <div key={paper.id}>
            <Link to={`/test/${paper.id}`} style={{ textDecoration: "none" }}>
              {paper.paperName}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
