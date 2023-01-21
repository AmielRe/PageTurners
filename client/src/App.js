import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Book from './components/Book';
import BookDetails from './components/BookDetails';


function App() {


  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:title" element={<BookDetails />} />
      </Routes>
    </Router>


  );
}

export default App;
