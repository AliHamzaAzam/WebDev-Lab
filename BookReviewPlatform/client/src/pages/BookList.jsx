import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBooks } from '../services/api';

export default function BookList() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const { data } = await getBooks();
                setBooks(data);
                setError('');
            } catch (error) {
                setError('Failed to load books. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    return (
        <div className="book-review-container">
            <div className="review-header-section">
                <h1>Book Reviews</h1>
                <p>Discover and share your favorite books</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading-spinner"></div>
            ) : (
                <div className="books-grid">
                    {books.map(book => (
                        <div key={book.id} className="book-card">
                            <Link to={`/books/${book.id}`} className="book-link">
                                <h3 className="book-title">{book.title}</h3>
                                <p className="book-author">By {book.author}</p>
                                <p className="book-description">{book.description}</p>
                            </Link>
                            <div className="book-meta">
                <span className="review-count">
                  {book.reviews.length} Review{book.reviews.length !== 1 && 's'}
                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}