import { useState } from 'react'
import { loginApi } from '../services/UserServie'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
function Login() {
    const navigate = useNavigate();
    const { loginContext } = useContext(UserContext);


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [loadingAPI, setLoadingAPI] = useState(false)

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) {
            navigate('/')
        }
    }, [])


    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email/Password is required")
            return
        }
        setLoadingAPI(true)
        let res = await loginApi(email.trim(), password)
        if (res && res.token) {
            loginContext(email, res.token)
            navigate('/')
        } else {
            //error
            console.log(res)
            if (res && res.status === 400) {
                toast.error(res.data.error)
            }
        }
        setLoadingAPI(false)

    }

    const handleGoBack = () => {
        navigate('/')
    }

    const handlePressEnter = (event) => {
        if (event && event.key === 'Enter') {
            handleLogin();
        }
    }

    return (<>
        <div className="login-container col-12 col-sm-4">
            <header className="title">Log in </header>
            <div className="text">Email or Username(eve.holt@reqres.in)</div>
            <input type="text" placeholder='Email or username' value={email}
                onChange={(event) => { setEmail(event.target.value) }} />
            <div className="input-2">
                <input type={isShowPassword === true ? 'text' : 'password'}
                    placeholder='Password' value={password}
                    onChange={(event) => { setPassword(event.target.value) }}
                    onKeyDown={(event) => handlePressEnter(event)}
                />
                <i className={isShowPassword === true ? 'fa-solid fa-eye' : 'fa-solid fa-slash'}
                    onClick={() => setIsShowPassword(!isShowPassword)}></i>
            </div>

            <button className={email && password ? 'active' : ''}
                disabled={(email && password) ? false : true}
                onClick={() => handleLogin()}
            >
                {loadingAPI && <i className='fa-solid fa-sync fa-spin'></i>}
                &nbsp; Log in
            </button>

            <div className="back">
                <i className='fa-solid fa-angles-left'></i>
                <span onClick={() => handleGoBack()}>&nbsp;Go back</span>
            </div>
        </div>
        <footer className="footer-app"></footer>


    </>);
}

export default Login;
