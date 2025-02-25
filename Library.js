const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

let Library = [
  { ID: 1, Title: "Solo Leveling" },
  { ID: 2, Title: "The Beginning After the End" },
  { ID: 3, Title: "Damn Reincarnation" },
  { ID: 4, Title: "The Author's POV" },
];


app.get('/books', (req, res) => {
  res.json(Library);
});


app.post('/books', (req, res) => {
  const { ID, Title } = req.body;
  if (!ID || !Title) {
    return res.send("Both ID and Title are required");
  }

  if (Library.find(b => b.ID == ID)) {
    return res.send("Book with this ID already exists");
  }

  const newBook = { ID, Title };
  Library.push(newBook);
  res.send(`Book '${newBook.Title}' added`);
});

app.delete('/books/:ID', (req, res) => {
  const bookIndex = Library.findIndex(b => b.ID == req.params.ID);
  if (bookIndex === -1) {
    return res.send("No Book to delete");
  }
  
  const deletedBook = Library[bookIndex];
  Library.splice(bookIndex, 1);
  res.send(`Book '${deletedBook.Title}' deleted`);
});

app.put('/books/:ID', (req, res) => {
  const book = Library.find(b => b.ID == req.params.ID);
  if (!book) {
    return res.send("Book not found");
  }

  book.Title = req.body.Title;
  res.send(`Book updated: ${book.Title}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
