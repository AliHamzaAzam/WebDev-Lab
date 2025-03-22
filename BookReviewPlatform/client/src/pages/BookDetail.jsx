import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBook, addReview } from '../services/api';

export default function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviewData, setReviewData] = useState({
        user: '',
        rating: '',
        comment: ''
    });

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const { data } = await getBook(id);
                setBook(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            const { data } = await addReview(id, reviewData);
            setBook(prev => ({
                ...prev,
                reviews: [...prev.reviews, data]
            }));
            setReviewData({ user: '', rating: '', comment: '' });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="book-detail">
            {loading ? <p>Loading...</p> : (
                <>
                    <h2>{book.title}</h2>
                    <p className="author">By {book.author}</p>
                    <p className="description">{book.description}</p>

                    <div className="review-section">
                        <h3>Reviews ({book.reviews.length})</h3>

                        {book.reviews.length === 0 ? (
                            <p className="no-reviews">No reviews yet. Be the first to add one!</p>
                        ) : (
                            book.reviews.map(review => (
                                <div key={review.id} className="review-card">
                                    <div className="review-header">
                                        <span className="review-author">{review.user}</span>
                                        <div className="review-rating">
                                            {Array(5).fill().map((_, i) => (
                                                <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>★</span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="review-text">{review.comment}</p>
                                </div>
                            ))
                        )}

                        <div className="add-review">
                            <h4>Add Your Review</h4>
                            <form onSubmit={handleSubmitReview}>
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        value={reviewData.user}
                                        onChange={(e) => setReviewData({ ...reviewData, user: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Rating:</label>
                                    <select
                                        value={reviewData.rating}
                                        onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Rating</option>
                                        <option value="5">5 Stars</option>
                                        <option value="4">4 Stars</option>
                                        <option value="3">3 Stars</option>
                                        <option value="2">2 Stars</option>
                                        <option value="1">1 Star</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Review:</label>
                                    <textarea
                                        value={reviewData.comment}
                                        onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                                        required
                                    />
                                </div>
                                <button type="submit" className="submit-button">
                                    Post Review
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}