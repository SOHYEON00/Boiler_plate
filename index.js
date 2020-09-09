// 백엔드의 시작점
const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');

const config = require('./config/key');

const {User} = require("./models/User");

//application/x-www-form-urlenceded 형태의 데이터를 분석해서 가져오게 해주는 것
app.use(bodyParser.urlencoded({extended: true})); 

//application/json 타입으로 된 것을 분석해서 가져오게 해주는 것
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    userNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err => console.log(err)))


app.get('/', (req, res) => {
  res.send('Hello World! asdfasdfdf')
})

app.post('/register', (req, res) => {
    //회원가입시 필요한 정보들을 client에서 가져오면
    // 그것들을 db에 넣어준다.


    const user = new User(req.body);

    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    }); 
    //mongodb에서 오는 데이터들을 저장 
    //status(200): 성공했다는 표시햣


})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})