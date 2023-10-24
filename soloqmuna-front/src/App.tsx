import { Home } from './modules/home/Home';
import './app.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
