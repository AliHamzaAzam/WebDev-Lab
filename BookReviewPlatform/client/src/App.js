import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookList from './pages/BookList';
import BookDetail from './pages/BookDetail';
import AddBookForm from './pages/AddBookForm';
import EditBookForm from './pages/EditBookForm';
import Navigation from './components/Navigation';
import './App.css';
import './Navigation.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Navigation />
                <Routes>
                    <Route path="/" element={<BookList />} />
                    <Route path="/books/:id" element={<BookDetail />} />
                    <Route path="/add-book" element={<AddBookForm />} />
                    <Route path="/books/:id/edit" element={<EditBookForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;