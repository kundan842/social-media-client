import React , {useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.scss'
import { axioClient } from '../../utils/client'
function Signup() {

     const [name, setName] = useState('')
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
     const navigate = useNavigate();

     const handleSubmit = async (e) =>
     {
        e.preventDefault();
        try{
            const result  = await axioClient.post('/auth/signup', 
            {
                name,
                email,
                password
            })

            console.log(result)
            navigate('/');


        }
        catch(e)
        {
            console.log(e.message)
        }

     }
    return(<div className="SignUp">
    <div className="signup-box">
        <h2 className='heading'>SignUp</h2>
        <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
            <input id="name" type="text"  onChange={(e) => setName(e.target.value)}/>
            <label htmlFor='email'>Email</label>
            <input id="email" type="email" onChange={e => setEmail(e.target.value)} />
            <label htmlFor='password'>Password</label>
            <input type="password" id='password' onChange={e => setPassword(e.target.value)} />
            <input type="submit" className='btn' value="Login" />
        </form>
        <p className="sub-heading"> already have an account? <Link to='/login'>Login</Link></p>
    </div>
</div>)
}

export default Signup