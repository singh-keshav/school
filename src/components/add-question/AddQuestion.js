import { useEffect, useRef, useState } from "react"
import { createQuestion, getTags, searchTags } from "../../api";

export default function AddQuestion({ onRemoveQuestion, }) {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [options, setOptions] = useState([]);
  const [tags, setTags] = useState([]);

  const [selectedTags, setSelectedTags] = useState([]);
  const [tagSearchText, setTagSearchText] = useState('');

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await searchTags(tagSearchText);
        if (response.data) {
          setTags(response.data);
        }
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTags();
  }, [tagSearchText]);

  function handleAddOption() {
    setOptions(prev => ([...prev, { value: '' }]));
  }

  function handleRemoveOption(optionIndex) {
    setOptions(prev => prev.filter((_val, index) => index !== optionIndex))
  }

  function handleAddAnswer() {
    setAnswers(prev => ([...prev, { value: '' }]));
  }

  function handleRemoveAnswer(answerIndex) {
    console.log(answerIndex)
    setAnswers(prev => prev.filter((_val, index) => index !== answerIndex))
  }

  const selectRef = useRef();

  async function handleSave() {
    try {
      const response = await createQuestion({ question, options, suggestedAnswers: answers, tags: selectedTags });
      console.log(response);
      console.log(selectRef);
    } catch (error) {
      console.log(error);
    }
  }

  return <div className="p-2">

    <div className="d-flex gap-2 my-2">
      <input className="form-control" placeholder="Add Question" value={question} onChange={e => setQuestion(e.target.value)} />
      <button type="button" className="btn btn-danger" onClick={onRemoveQuestion}>remove</button>
    </div>

    <div>
      {
        options.map((op, index) =>
          <div className="p-2 d-flex gap-2" key={index}>
            <span>{index + 1}.</span>
            <input className="form-control" placeholder="Add Option" value={op.value} onChange={e => setOptions(prev => prev.map((_op, i) => i === index ? { ..._op, value: e.target.value } : _op))} />
            <button type="button" className="btn btn-danger" onClick={() => handleRemoveOption(index)}>Remove</button>
          </div>
        )
      }
      <button className="btn btn-secondary d-block" type="button" onClick={handleAddOption}>Add Option</button>
    </div>

    <div className="my-2">
      <label className="form-label">Please enter comma seperated option numbers</label>

      {
        answers.map((ans, index) =>

          <div className="p-2 d-flex gap-2">
            <input className="form-control" placeholder="Answer" value={ans.value} onChange={e => setAnswers(prev => prev.map((_ans, i) => i === index ? { ..._ans, value: e.target.value } : _ans))} />
            <input type={'number'} placeholder="Percentage Score" value={ans.score} onChange={e => setAnswers(prev => prev.map((_ans, i) => i === index ? { ..._ans, score: e.target.value } : _ans))} />
            <button type="button" className="btn btn-danger" onClick={() => handleRemoveAnswer(index)}>remove</button>
          </div>

        )
      }
      <button type="button" className="btn btn-secondary d-block" onClick={handleAddAnswer}>Add Answer</button>
    </div>


    <div>
      <div>
        {selectedTags.map(tag => <div className="badge bg-danger m-1" key={tag.id}>{tag.name}</div>)}
      </div>
      <input className="form-control" value={tagSearchText} placeholder="search tags" onChange={e => setTagSearchText(e.target.value)} />
      {tags.map(tag => <div key={tag.id} onClick={e => setSelectedTags(prev => {
        const isTagSelected = selectedTags.findIndex(t => t.id === tag.id) !== -1;
        if (isTagSelected) {
          return prev.filter(t => t.id !== tag.id)
        }
        return [...prev, tag]
      })}>{tag.name}</div>)}
    </div>

    <div className="d-flex justify-content-start gap-4 p-2">
      <button className="btn btn-primary" onClick={handleSave}>Save</button>
      <button className="btn btn-danger">Cancel</button>
    </div>

  </div>
}