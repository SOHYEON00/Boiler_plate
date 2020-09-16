import React, {useState} from 'react';
import {useDispatch} from 'react-redux'; //dispatch를 이용해 action을 취함 
import { registerUser } from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom'; 

function RegisterPage(props) {
  //서버에 보내고자 하는 값 = state

  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };    

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if(Password !== ConfirmPassword) {
        return alert('비밀번호 확인이 확인되지 않습니다.');
    }

    let body = {
      email: Email,
      password: Password,
      name: Name,
    };

    //임의로 loginUser 페이지를 만들진 않았지만, _action 폴더에 만들어서 사용할 것
    //리덕스를 사용하지 않으면 dispatch가 아니라 axios사용.
    // axios.post('/api/users/register', body) 이런 식으로 사용함

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push("/LoginPage");
      } else {
        alert("failed to sign up");
      }
    });
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
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        
        <label>Confirm Password</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />

        <br />
        <button type="submit"> 회원 가입 </button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);