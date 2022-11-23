import { useEffect, useState } from "react";
import { createTag, getTags } from "../api";

export function Tags() {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState([]);
  const [manualReloadCount, setManualReloadCount] = useState(0);

  async function handleAddTag() {
    try {
      const response = await createTag({ name: newTag });
      // console.log(response);
      setManualReloadCount((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await getTags();
        if (response.data) {
          setTags(response.data);
        }
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTags();
  }, [manualReloadCount]);

  return (
    <div>
      <div className="m-2">
        <label className="form-label">Add Tag Name</label>
        <input
          className="form-control my-2"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddTag}>
          Create New Tag
        </button>
      </div>
      <span>List of Available Tags</span>
      <div className="my-2">
        {tags.map((tag, index) => (
          <div key={index}>
            {index + 1}. {tag.name}
          </div>
        ))}
      </div>
    </div>
  );
}
