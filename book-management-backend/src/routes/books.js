const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const Book = require('../models/Book');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

const isSeller = (req, res, next) => {
  if (req.user.role !== 'SELLER') {
    return res.status(403).json({ error: 'Access denied, only sellers can perform this action' });
  }
  next();
};

router.post('/upload', isSeller, upload.single('file'), (req, res) => {
  const { file } = req;
  if (!file) return res.status(400).json({ error: 'File is required' });

  const books = [];

  fs.createReadStream(file.path)
    .pipe(csv())
    .on('data', (data) => books.push(data))
    .on('end', async () => {
      try {
        for (const book of books) {
          await Book.create({
            title: book.title,
            author: book.author,
            price: book.price,
            userId: req.user.id
          });
        }
        res.status(201).json({ message: 'Books added successfully' });
      } catch (error) {
        res.status(400).json({ error: 'Error processing CSV file' });
      } finally {
        fs.unlinkSync(file.path);
      }
    });
});

router.get('/seller', isSeller, async (req, res) => {
  const books = await Book.findAll({ where: { userId: req.user.id } });
  res.json(books);
});

router.put('/seller/:id', isSeller, async (req, res) => {
  const { id } = req.params;
  const { title, author, price } = req.body;

  try {
    const [updated] = await Book.update({ title, author, price }, {
      where: { id, userId: req.user.id }
    });

    if (!updated) return res.status(404).json({ error: 'Book not found or not authorized' });
    res.json({ message: 'Book updated successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error updating book' });
  }
});

router.delete('/seller/:id', isSeller, async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Book.destroy({
      where: { id, userId: req.user.id }
    });

    if (!deleted) return res.status(404).json({ error: 'Book not found or not authorized' });
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting book' });
  }
});

router.get('/', async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByPk(id);

  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

module.exports = router;
