const express = require('express')

const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Підключено до MongoDB'))
  .catch((err) => console.error('Не вдалося підключитися до MongoDB', err))

const app = express()

app.use(express.json())

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
})

const User = mongoose.model('User', userSchema)

app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    res.status(201).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
})

app.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (error) {
    res.status(500).send(error)
  }
})

const port = 3000
app.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`)
})
