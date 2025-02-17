const express = require('express');
const app = express();

app.use(express.json());

let data = []

app.get('/api/data', (req, res) => {
    console.log('get request')
    res.json(data);
});

app.post('/api/data', (req, res) => {
    console.log('post request')
    const newItem = req.body;
    data.push(newItem);
    res.status(201).json(newItem);
});

app.delete('/api/data/:index', (req, res) => {
    console.log('delete request')
    const index = parseInt(req.params.index);
    if (index >= 0 && index < data.length) {
        const removedItem = data.splice(index, 1); 
        res.json(removedItem);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
