import React, {useEffect } from 'react';
import {useDispatch } from 'react-redux';
import {auth} from '../_actions/user_action';

// SpecificComponent : App.js 에서 컴포넌트로 라우팅해주는 landingPage, loginPage...이 해당됨
// option 
// null => 아무나 출입이 가능한 페이지
// true => 로그인한 유저만 출입이 가능한 페이지
// false => 로그인한 유저는 출입이 불가능한 페이지
// adminRoute (true): 파라미터로 넣어주는 경우, admin한 유저만 출입가능한 페이지라는 뜻
// adminRoute = null => 상위 컴포넌트가 보내준 파라미터가 없는 경우 디폴트값이 null 
export default function(SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    //백엔드에 request 보내서 현재 유저의 상태를 가져오기 부분

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);
        //로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          //로그인 한 상태
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (option === false) props.history.push("/");
          }
        }
      }); //auth를 user_action 부분에 만들어줘야함.
      // response에 서버에서 전해준 유저의 모든 정보,userData가 들어있음.
    }, []);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
