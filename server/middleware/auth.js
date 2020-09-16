const { User } = require('../models/User');

let auth = (req, res, next) => {
  //인증처리 하는 곳

  //1. 클라이언트 쿠키에서 토큰을 가져온다
  //cookie-parser 사용
  let token = req.cookies.x_auth;

  //2. 토큰을 복호화한 후 유저를 찾는다
  //user model에서 메소드를 만든 후 사용
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;
    // 토큰과 유저를 req에 넣어주는 이유는 index에서도 사용할 수 있도록 넘겨주기 위함
    next(); //auth가 middleware이기 때문에 계속 처리할 수 있도록
  });

  //3-1. 유저가 있으면 인증 ok

  //3-2. 유저가 없으면 인증 no
};

module.exports = { auth };
