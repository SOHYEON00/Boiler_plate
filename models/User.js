const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, //space 없애주는 역할
        unique: 1 //유니크한 값
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },//유저는 관리자 or 유저가 될 수 있음. 
    image: String,
    token: {
        type: String
    }, //유효성 관리
    tokenExp: {
        type: Number
    } //토큰 사용기간
})

const User = mongoose.model('User', userSchema);

module.exports = { User }; //User module을 다른 곳에서도 쓸 수 있도록 export

//user module, schema 완료