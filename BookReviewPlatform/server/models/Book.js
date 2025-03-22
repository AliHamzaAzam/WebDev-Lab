const { v4: uuidv4 } = require('uuid');

let books = [
    {
        id: uuidv4(),
        title: 'Sample Book',
        author: 'John Doe',
        description: 'A sample book description',
        reviews: []
    }
];

module.exports = books;