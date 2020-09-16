// // 백엔드의 시작점
// const express = require('express');
// const app = express();
// // const path = require('path');
// // const cors = require('cors');

// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');

// const config = require('./config/key');

// const {User} = require("./models/User");
// const {auth} = require("./middleware/auth");

// //application/x-www-form-urlenceded 형태의 데이터를 분석해서 가져오게 해주는 것
// app.use(bodyParser.urlencoded({extended: true})); 

// //application/json 타입으로 된 것을 분석해서 가져오게 해주는 것
// app.use(bodyParser.json());
// app.use(cookieParser());

// const mongoose = require('mongoose');

// mongoose.connect(config.mongoURI, {
//      useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
// }).then(() => console.log('MongoDB Connected...'))
// .catch(err => console.log(err));

// // app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Hello World! asdfasdfdf");
// });

// app.get("/api/hello", (req, res) => {
//   res.send("Hello World! asdfasdfdf");
// });

// app.post('/api/users/register', (req, res) => {
//   //회원가입시 필요한 정보들을 client에서 가져오면
//   // 그것들을 d b에 넣어준다.

//   const user = new User(req.body);

//   user.save((err, userInfo) => {
//     if (err) return res.json({ success: false, err });
//     return res.status(200).json({
//       success: true
//     })
//   })
//   //mongodb에서 오는 데이터들을 저장
//   //status(200): 성공했다는 표시햣
// });

// //login
// //client/LoginPage.js의 form onSubmitHandler() 에서 보낸 state를 서버가 처리하는 부분
// app.post('/api/users/login', (req, res) => {
//   //요청된 이메일을 db안에 있는지 찾는다.
//   User.findOne({ email: req.body.email }, (err, user) => {
//     if (!user) {
//       return res.json({
//         loginSuccess: false,
//         message: "제공된 이메일에 해당하는 유저가 없습니다."
//       });
//     }

//   //요청된 이메일이 db에 있다면 비밀번호가 맞는 비밀번호인지 확인.
//     user.comparePassword(req.body.password, (err, isMatch) => {
//       if (!isMatch)
//         return res.json({
//           loginSuccess: false,
//           message: "비밀번호가 틀렸습니다."
//         });
    
//     //비밀번호까지 맞다면, 토큰 생성
//       user.generateToken((err, user) => {
//         if(err) return res.status(400).send(err);

//         //토큰을 (여러 고셍 저장할 수 있지만) ex) 쿠키, localStorage 여기서는 쿠키에 저장함.
//         res.cookie("x_auth",user.token)
//         .status(200)
//         .json({ loginSuccess: true, userId: user._id })
//     });
//   });
// });

// app.get('/api/users/auth', auth, (req, res) => {
//   // 여기까지 미들웨어를 통과해왔다는 얘기는 Authentication이 true라는 말.
//   res.status(200).json({
//     _id: req.user._id,
//     isAdmin: req.user.role === 0 ? false : true,
//     isAuth: true,
//     email: req.user.email,
//     name: req.user.name,
//     lastname: req.user.lastname,
//     role: req.user.role,
//     image: req.user.image,
//   });
// })
// //auth : '/api/users/auth'여기서 받은 다음에 cb (req, res)하기 전에 뭔가를 해줌. -> middleware folder


// app.get('/api/users/logout', auth, (req, res) => {
//   user.findOneAndUpdate({ _id: req.user._id}, 
//     { token: ""} //토큰을 지워주면 그냥 인증이 안돼서 로그인 기능이 풀려버리게끔 함.
//     , (err, user) => {
//       if(err) return res.json({ success: false, err});
//       return res.status(200).send({
//         siccess: true
//       })
//     })
// })

// const port = 5000;

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// });

  
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require('./middleware/auth');
const { User } = require("./models/User");



//application/json 
app.use(bodyParser.json());
app.use(cookieParser());
//application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World!~~ '))

app.get('/api/hello', (req, res) => res.send('Hello World!~~ '))

app.post('/api/users/register', (req, res) => {

  //회원 가입 할떄 필요한 정보들을  client에서 가져오면 
  //그것들을  데이터 베이스에 넣어준다. 
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/api/users/login', (req, res) => {

  // console.log('ping')
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    // console.log('user', user)
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      // console.log('err',err)

      // console.log('isMatch',isMatch)

      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      //비밀번호 까지 맞다면 토큰을 생성하기.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다.  어디에 ?  쿠키 , 로컳스토리지
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  })
})


// role 1 어드민    role 2 특정 부서 어드민 
// role 0 -> 일반유저   role 0이 아니면  관리자 
app.get('/api/users/auth', auth, (req, res) => {
  //여기 까지 미들웨어를 통과해 왔다는 얘기는  Authentication 이 True 라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  // console.log('req.user', req.user)
  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" }
    , (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      })
    })
})





const port = 5000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

