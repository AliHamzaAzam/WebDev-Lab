const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const books = require('../models/Book');

// Get all books
router.get('/', (req, res) => {
    res.json(books);
});

// Create new book
router.post('/', (req, res) => {
    const { title, author, description } = req.body;

    if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required' });
    }

    const newBook = {
        id: uuidv4(),
        title,
        author,
        description: description || '',
        reviews: []
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// Get single book
router.get('/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
});

// Update book
router.put('/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const { title, author, description } = req.body;
    if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required' });
    }

    book.title = title;
    book.author = author;
    book.description = description || '';
    res.json(book);
});

// Add review
router.post('/:id/reviews', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const { user, comment, rating } = req.body;
    if (!user || !comment || !rating) {
        return res.status(400).json({ error: 'All review fields are required' });
    }

    const newReview = {
        id: uuidv4(),
        user,
        comment,
        rating: Number(rating)
    };

    book.reviews.push(newReview);
    res.status(201).json(newReview);
});

module.exports = router;