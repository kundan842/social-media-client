import React ,{ useState}from 'react'
import './login.scss'
import { axioClient } from '../../utils/client'

import { Link, useNavigate } from 'react-router-dom'
import { LOCAL_STORAGE_TOKEN_KEY, setItem } from '../../utils/storageManager'
function Login() {
    console.log('inside login')
    const [email, setEmail]=useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleSubmit =  async (event) =>
    {

        console.log(email)
        event.preventDefault();
        try
        {
            const response =  await axioClient.post('/auth/login', {
                email,
                password
            })
          console.log(response)
            setItem(LOCAL_STORAGE_TOKEN_KEY, response.result.accessToken)
            navigate('/')
        }
        catch (e) 
        {
            console.log(e.message)
        }
   
        
    }

    return(<div className="Login">
    <div className="login-box">
        <h2 className='heading'>Login</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input id="email" type="text"  onChange={e => setEmail(e.target.value)}/>
            <label htmlFor='password'>Password</label>
            <input type="password" id='password' onChange={e => setPassword(e.target.value)} />
            <input type="submit" className='btn' value="Login" />
        </form>
        <p className="sub-heading">Don't have an account? <Link to='/signup'>Sign Up</Link></p>
    </div>
</div>
)

}

export default Login;