import { Link } from 'react-router-dom';
import '../Navigation.css';

export default function Navigation() {
    return (
        <nav className="main-nav">
            <Link to="/" className="nav-brand">Book Reviews</Link>
            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/add-book" className="nav-link">Add Book</Link>
            </div>
        </nav>
    );
}