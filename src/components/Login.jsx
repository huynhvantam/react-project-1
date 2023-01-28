import { useState } from 'react'
import { loginApi } from '../services/UserServie'
import { toast } from 'react-toastify'
function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)
    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email/Password is required")
            return
        }
        let res = await loginApi(email, password)
        if (res && res.token) {
            localStorage.setItem('token', res.token)
        }
    }

    return (<>
        <div className="login-container col-12 col-sm-4">
            <header className="title">Log in</header>
            <div className="text">Email or Username</div>
            <input type="text" placeholder='Email or username' value={email}
                onChange={(event) => { setEmail(event.target.value) }} />
            <div className="input-2">
                <input type={isShowPassword === true ? 'text' : 'password'}
                    placeholder='Password' value={password}
                    onChange={(event) => { setPassword(event.target.value) }} />
                <i className={isShowPassword === true ? 'fa-solid fa-eye' : 'fa-solid fa-slash'}
                    onClick={() => setIsShowPassword(!isShowPassword)}></i>
            </div>

            <button className={email && password ? 'active' : ''}
                disabled={email && password ? false : true}
                onClick={() => handleLogin()}
            >Log in</button>

            <div className="back">
                <i className='fa-solid fa-angles-left'></i>Go back</div>
        </div>
        <footer className="footer-app"></footer>


    </>);
}

export default Login;
