import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types';

//previousState, action을 nextState로 만듦
export default function (state= {}, action) {
    switch(action.type) { //action의 타입에 맞게 state 설정
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }; 
            //스프레드 오퍼레이터 : arg로 되어있는 state를 그대로 사용한다는 의미
            // user_action.js에서의 payload를 loginSuccess에 넣어줌
        case REGISTER_USER:
            return { ...state, register: action.payload };
        case AUTH_USER: 
            return { ...state, userData: action.payload}; //server/index.js 에서 app.get(~~/auth)를 보면 
            // 해당 유저의 모든 정보를 클라이언트에게 전해주고 있고 action.payload에 서버에서 전해준 모든 유저의 정보가 들어있음
            // 그래서 userData라고 이름 지음.
        default:
            return state;
    }



















}