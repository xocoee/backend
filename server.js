const express = require('express');
const app = express();

app.use(express.json());

let data = []

app.get('/api/data', (req, res) => {
    console.log('get request', data)
    res.json(data);
});

app.post('/api/data', (req, res) => {
    console.log('post request', req.body)
    const newItem = req.body;
    const newId = new Date().getTime().toString()
    newItem.id = newId
    data.push(newItem);
    console.log('added item', newItem);
    res.status(201).json(newItem);
});

app.delete('/api/data/:id', (req, res) => {
    console.log('delete request', res)
    const { id } = req.params;
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        const removedItem = data.splice(index, 1);
        console.log('deleted item', removedItem);
        res.json(removedItem);
    } else {
        console.log('Item not found with id:', id);
        res.status(404).json({ message: 'Item not found' });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
