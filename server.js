const express = require('express')

const mongoose = require('mongoose')

// Підключення до MongoDB
mongoose
  .connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Підключено до MongoDB'))
  .catch((err) => console.error('Не вдалося підключитися до MongoDB', err))

// Створення додатку Express
const app = express()

// Дозволяємо Express парсити JSON у запитах
app.use(express.json())

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
})

const User = mongoose.model('User', userSchema)

app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body) // Створюємо нового користувача з даними з запиту
    await user.save() // Зберігаємо в базі даних
    res.status(201).send(user) // Повертаємо створеного користувача
  } catch (error) {
    res.status(400).send(error) // У разі помилки повертаємо статус 400
  }
})

app.get('/users', async (req, res) => {
  try {
    const users = await User.find() // Знаходимо всіх користувачів
    res.send(users) // Повертаємо список
  } catch (error) {
    res.status(500).send(error) // У разі помилки повертаємо статус 500
  }
})

const port = 3000
app.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`)
})
