import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../services/api';

export default function AddBookForm() {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};
        if (!formData.title.trim()) validationErrors.title = 'Title is required';
        if (!formData.author.trim()) validationErrors.author = 'Author is required';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await addBook(formData);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="form-container">
            <div className="form-header">
                <h2>Add New Book</h2>
                <p>Share your favorite books with the community</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        placeholder="Enter book title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    {errors.title && <span className="error">{errors.title}</span>}
                </div>

                <div className="form-group">
                    <label>Author</label>
                    <input
                        placeholder="Enter author name"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    />
                    {errors.author && <span className="error">{errors.author}</span>}
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        placeholder="Add a brief description"
                        rows="4"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <button type="submit" className="submit-button">
                    Add Book
                </button>
            </form>
        </div>
    );
}