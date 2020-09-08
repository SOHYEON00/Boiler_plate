// 백엔드의 시작점
const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://sohyeonOh:sohyeonOhPw@cluster0.8hdqd.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    userNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Conndected...'))
.catch(err => console.log(err => console.log(err)))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})