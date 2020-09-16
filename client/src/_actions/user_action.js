// import axios from 'axios';
// import {
//     LOGIN_USER,
//     REGISTER_USER,
//     AUTH_USER
// } from './types';

// export function loginUser(dataToSubmit) {

//   const request = axios
//     .post("/api/users/login", dataToSubmit) //서버에 request 날림
//     .then(response => response.data  );//서버에서 받은 데이터를 request에 저장
    

//   //저장한 request를  reducer에 보냄
//     return{
//         type: LOGIN_USER,
//         payload: request
//     }

// } 

// export function registerUser(dataToSubmit) {

//   const request = axios
//     .post('/api/users/register', dataToSubmit)
//     .then(response => response.data);

//   return {
//     type: REGISTER_USER,
//     payload: request
//   }

// }
// export function auth() {

//   const request = axios
//     .get('/api/users/auth') //get method이기 때문에 body부분, argument 부분은 필요가 없음
//     .then(response => response.data);

//   return {
//     type: AUTH_USER,
//     payload: request
//   }

// }

import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';
export function loginUser(dataToSubmit) {

    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {

    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}



export function auth() {

    const request = axios.get('/api/users/auth')
        .then(response => response.data)

    return {
        type: AUTH_USER,
        payload: request
    }
}

