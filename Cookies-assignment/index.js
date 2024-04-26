const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Route to display form
app.get('/', (req, res) => {
  res.render('index');
});

// Route to handle form submission
app.post('/submit', (req, res) => {
  const { name, age } = req.body;

  // Set cookies
  res.cookie('username', name);
  res.cookie('age', age);

  res.redirect('/');
});

// Route to display cookies
app.get('/cookies', (req, res) => {
  res.render('cookies', { cookies: req.cookies });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
