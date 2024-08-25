
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

app.use(cors()); 
app.use(express.json());

// POST method for /bfhl route
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
    const lowercaseAlphabets = alphabets.filter(item => /^[a-z]$/.test(item));
    const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().slice(-1)[0]] : [];

    const response = {
        is_success: true,
        user_id: process.env.USER_ID,
        email: process.env.EMAIL,
        roll_number: process.env.ROLL_NUMBER,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet,
    };

    res.status(200).json(response);
});

// GET method for /bfhl route
app.get('/bfhl', (req, res) => {
    const response = {
        operation_code: 1
    };

    res.status(200).json(response);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
