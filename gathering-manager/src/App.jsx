import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Test from './pages/Home/Home';
import Community from './pages/Community/Community';
import Stats from './pages/Stats/Stats';
import GatheringsPage from './pages/GatheringsPage/GatheringsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Test />}/>
        <Route path="/stats" element={<Stats/>}/>
        <Route path="/community" element={<Community/>}/>
        <Route path="/gatherings" element={<GatheringsPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
