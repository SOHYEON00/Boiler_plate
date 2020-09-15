// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const saltRounds =  10; //saltRounds 크기만큼의 글자수를 가진 salt생성
// //생성한 salt를 이용해서 비밀번호를 암호화시킴.
// const jwt = require('jsonwebtoken');


// const userSchema = mongoose.Schema({
//     name: {
//         type: String,
//         maxlength: 50
//     },
//     email: {
//         type: String,
//         trim: true, //space 없애주는 역할
//         unique: 1 //유니크한 값
//     },
//     password: {
//         type: String,
//         minlength: 5
//     },
//     lastname: {
//         type: String,
//         maxlength: 50
//     },
//     role: {
//         type: Number,
//         default: 0
//     },//유저는 관리자 or 유저가 될 수 있음. 
//     image: String,
//     token: {
//         type: String
//     }, //유효성 관리
//     tokenExp: {
//         type: Number
//     } //토큰 사용기간
// })


// userSchema.pre('save', function( next ) {
    

//  let user = this; //this = userSchema
//  if(user.isModified('password')) { //비밀번호를 바꿀 때만 비밀번호를 암호화해주기
//    bcrypt.genSalt(saltRounds, function (err, salt) {
//      if (err) return next(err);

//      //비밀번호를 암호화 시킴
//      bcrypt.hash(user.password, salt, function (err, hash) {
//        if (err) return next(err);
//        user.password = hash; //hash(암호화된 비밀번호 생성에 성공하면, plain비밀번호를 hashed된 비밀번호로 바꿔줌)
//        next(); //index.js의 user.save 쪽으로 넘어가게끔 함.
//      });
//      // user.password : plain password
//      // hash : 암호화된 비밀번호
//    });
//  } else { //비밀번호가 아니라 다른 정보를 변경한 경우 바로 next();
//      next();
//  }
    
// });


// userSchema.methods.comparePassword = function(plainPassword, cb) {
//     //입력된 plainPassword를 암호화해서 이미 암호화된 hashed 비밀번호와 비교해야 함.
//     bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
//         if(err) return cb(err)
//         cb(null, isMatch)
//     })
// };

// userSchema.methods.generateToken = function(cb) {

//     let user = this;

//     //jsonwebtoken을 이용해 토큰 생성

//     let token = jwt.sign(user._id.toHexString(), 'secretToken');
//     user.token = token;
//     user.save(function(err, user) {
//         if(err) return cb(err)
//         cb(null, user)
//     })
    
//     // 과정
//     // user._id + 'secretToken' = token
//     // ->
//     // 'secretToken' -> user._id
// }

// userSchema.statics.findByToken = function ( token, cb) {
//     let user = this;

//     //가져온 토큰을 복호화(디코드)
//     jwt.verify(token, 'secretToken', function(err, decoded) {
//         //decoded 는 유저 아이디
//         //유저 아이디를 이용해 유저를 찾은 후
//         //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인


//         user.findOne({ "_id": decoded, "token": token, function(err, user){
//             if(err) return cb(err);
//             cb(null, user);
//         } })
//     })
// }

// const User = mongoose.model('User', userSchema);

// module.exports = { User }; //User module을 다른 곳에서도 쓸 수 있도록 export

// //user module, schema 완료


const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");

const userSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true,
        unique: 1 
    },
    password: {
        type: String,
        minglength: 5
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    role : {
        type:Number,
        default: 0 
    },
    image: String,
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    }
})


userSchema.pre('save', function( next ) {
    var user = this;
    
    if(user.isModified('password')){    
        // console.log('password changed')
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash 
                next()
            })
        })
    } else {
        next()
    }
});

userSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    console.log('user',user)
    console.log('userSchema', userSchema)
    var token =  jwt.sign(user._id.toHexString(),'secret')
    var oneHour = moment().add(1, 'hour').valueOf();

    user.tokenExp = oneHour;
    user.token = token;
    user.save(function (err, user){
        if(err) return cb(err)
        cb(null, user);
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token,'secret',function(err, decode){
        user.findOne({"_id":decode, "token":token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User }