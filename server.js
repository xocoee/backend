const express = require('express')
const WebSocket = require('ws')
const http = require('http')

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

app.use(express.json())

let data = []

wss.on('connection', (ws) => {
  console.log('New WebSocket client connected')

  ws.send(JSON.stringify({ message: 'Welcome to the WebSocket server!' }))
  ws.send(JSON.stringify({ messages: data }))

  ws.on('message', (message) => {
    console.log('Received from client:', message)

    data.push(message)

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ messages: data }))
      }
    })
  })

  ws.on('close', () => {
    console.log('WebSocket client disconnected')
  })
})

app.get('/api/data', (req, res) => {
  console.log('get request', data)
  res.json(data)
})

app.post('/api/data', (req, res) => {
  console.log('post request', req.body)
  const newItem = req.body
  const newId = new Date().getTime().toString()
  newItem.id = newId
  data.push(newItem)
  console.log('added item', newItem)
  res.status(201).json(newItem)
})

app.delete('/api/data/:id', (req, res) => {
  console.log('delete request', res)
  const { id } = req.params
  const index = data.findIndex((item) => item.id === id)
  if (index !== -1) {
    const removedItem = data.splice(index, 1)
    console.log('deleted item', removedItem)
    res.json(removedItem)
  } else {
    console.log('Item not found with id:', id)
    res.status(404).json({ message: 'Item not found' })
  }
})

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
