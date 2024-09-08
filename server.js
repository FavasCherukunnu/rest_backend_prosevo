const express = require('express');
const cors = require('cors'); // Import CORS middleware
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Enable CORS for all routes
app.use(cors()); 

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  }
});

const Student = mongoose.model('Student', studentSchema);

app.use(bodyParser.json());

app.get('/test', (req, res) => {
  res.json({ message: 'Hello from the backend' });
});

app.get('/students', (req, res) => {
  const { name } = req.query;
  const query = name ? { name: new RegExp(name, 'i') } : {};
  Student.find(query).then(students => res.json(students));
});

app.post('/students', (req, res) => {
  Student.create(req.body).then(student => {
    res.json(student);
  }).catch(err => {
    res.status(400).json({ message: 'Error creating student', errors: err.errors });
  });
});

app.get('/students/:id', (req, res) => {
  Student.findById(req.params.id).then(student => res.json(student));
});

app.put('/students/:id', (req, res) => {
  Student.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(student => {
    res.json(student);
  }).catch(err => {
    res.status(400).json({ message: 'Error updating student', errors: err.errors });
  });
});

app.delete('/students/:id', (req, res) => {
  Student.findByIdAndRemove(req.params.id).then(() => res.json({ message: 'Student deleted' }));
});

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
