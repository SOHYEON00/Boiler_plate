import React, {useState} from 'react';
import {useDispatch} from 'react-redux'; //dispatch를 이용해 action을 취함 
import { loginUser } from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom';

function LoginPage(props) {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  //서버에 보내고자 하는 값 = state

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };
    //임의로 loginUser 페이지를 만들진 않았지만, _action 폴더에 만들어서 사용할 것
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        //로그인에 성공한 경우
        props.history.push("/"); //페이지 이동!!
      } else {
        alert("Eroor");
      }
    });
    // 현재 state를 서버에 보내줌 _action폴더의 loginUsier에서 해야하는 것
    // Axios.post('/api/users/login', body)
    // .then(response => {
    // })
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        {/* // value 안에 state를 넣어야 함 
                onChange 이벤트를 이용해 Email state 값을 바꾸고 그 바뀐 값이 input value에 들어오게 되는 것*/}
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <br />
        <button type="submit"> Login </button>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);