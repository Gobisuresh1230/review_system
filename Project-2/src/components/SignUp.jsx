import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom"
import axios from 'axios';

export default function SignUp() {
    const [login,setLogin]=useState({
        userName:'',
        password:''
    })
    const [signUp,setSignUp]=useState({
        userName:'',
        password:''
    })

    function handleSubmit(e) {
      axios.post('http://localhost:3002/signup', signUp)
        .then(res => {
          console.log(res)
        })
        .catch(err => console.log(err))    
    }
   
    let data;
    const navigate = useNavigate(); 
    function submitLogin(e){
      e.preventDefault();
      if (login.userName === 'admin' && login.password === 'admin') {
       navigate('/home')
      } else {
        alert('Wrong login credentials');
      }
    }
    console.log(data)
  return (
    <div className='loginTop'>
    <div class="main">  	
		<input type="checkbox" id="chk" aria-hidden="true"/>

			<div class="signup">
				<form onSubmit={handleSubmit}>
					<label for="chk" aria-hidden="true" className='label'>Sign up</label>
					<input type="text" name="txt" placeholder="User name" required="" className='signupInput'
                    onChange={(e)=>setSignUp({...signUp,userName:e.target.value})}
                    />
					
					<input type="password" name="pswd" placeholder="Password" required=""
                    className='signupInput'
                    onChange={(e)=>setSignUp({...signUp,password:e.target.value})}
                    />
					<button className='loginBtn'>Sign up</button>
				</form>
			</div>

			<div class="login">
				<form onSubmit={submitLogin}>
					<label for="chk" aria-hidden="true" className='label'>Login</label>
					<input type="text" name="text" placeholder="username" required="" className='signupInput' onChange={(e)=>setLogin({...login,userName:e.target.value})}/>
					<input type="password" name="pswd" placeholder="Password" required="" className='signupInput'
                    onChange={(e)=>setLogin({...login,password:e.target.value})}
                    />
					<button className='loginBtn'>Login</button>
				</form>
			</div>
	</div>
    </div>
  )
}
