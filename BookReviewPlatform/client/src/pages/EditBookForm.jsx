import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBook, updateBook } from '../services/api';

export default function EditBookForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const { data } = await getBook(id);
                setFormData(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateBook(id, formData);
            navigate(`/books/${id}`);
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="book-detail">
            <h2>Edit Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Author:</label>
                    <input
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>
                <button type="submit" className="button">Update Book</button>
            </form>
        </div>
    );
}