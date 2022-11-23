import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import BaseLayout from './layouts/BaseLayout';
import { Route, Routes, } from 'react-router-dom';
import Paper from './components/Paper/Paper';
import { Tags } from './pages/Tags';
import AddQuestion from './components/add-question/AddQuestion';
import { TestPaper } from './components/test-paper/TestPaper';
import { Tests } from './components/test-paper/Tests';
import { Result } from './components/test-paper/Result';


function App() {
  return (
    <div className="App">
      <BaseLayout>
        <Routes>
          <Route
            path='papers'
            element={<Paper />}
          />
          <Route
            path='reports'
            element={<div>report</div>}
          />

          <Route
            path='tags'
            element={<Tags />}
          />

          <Route
            path='questions'
            element={<AddQuestion />}
          />

          <Route
            path='test/:id'
            element={<TestPaper />}
          />

          <Route
            path='/available-tests'
            element={<Tests />}
          />

          <Route
            path='/test-result/:paperId/:responseId'
            element={<Result />}
          />
        </Routes>


      </BaseLayout>
      <ToastContainer />
    </div>
  );
}

export default App;
