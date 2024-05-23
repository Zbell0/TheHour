const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Create a new SQLite3 database
const db = new sqlite3.Database('subscribers.db', (err) => {
  if (err) {
    console.error('Error creating database:', err);
  } else {
    console.log('Connected to the SQLite database.');

    // Create the "subscribers" table if it doesn't exist
    db.run('CREATE TABLE IF NOT EXISTS subscribers (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL)', (err) => {
      if (err) {
        console.error('Error creating table:', err);
      } else {
        console.log('Table "subscribers" created or already exists.');
      }
    });
  }
});

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle the form submission
app.post('/subscribe', (req, res) => {
  let email = req.body.email;

  // Ensure email is not undefined
  if (!email) {
    console.error('Error: Email is undefined');
    return res.status(400).json({ message: 'Email is required' });
  }

  // Trim the email value
  email = email.trim();

  // Check if the email is an empty string
  if (email === '') {
    console.error('Error: Email cannot be empty');
    return res.status(400).json({ message: 'Email cannot be empty' });
  }

  // Insert the email into the database
  const query = 'INSERT INTO subscribers (email) VALUES (?)';
  db.run(query, [email], (err) => {
    if (err) {
      console.error('Error inserting email:', err);
      return res.status(500).json({ message: 'Error saving email' });
    } else {
      console.log(`Email ${email} subscribed successfully`);
      return res.status(200).json({ message: 'Email subscribed successfully' });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
