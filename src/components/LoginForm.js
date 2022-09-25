import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
    login
    ,username
    ,password
    ,handleUsername
    ,handlePassword
}) => {
    const [visible, setVisible] = useState(false)

    const hideIfVisible = { 'display' : visible ? 'none' : '' }
    const showIfVisible = { 'display' : visible ? '' : 'none' }

    const handleVisible = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={showIfVisible}>
                <form id='login' onSubmit={login}>
                    <div>
                        <label>Username</label>
                        <input type='text' value={username} name='Username' onChange={handleUsername}></input>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type='password' value={password} name='Password' onChange={handlePassword}></input>
                    </div>
                    <button type='submit'>Login</button>
                </form>
                <button onClick={handleVisible}>Cancel</button>
            </div>
            <div style={hideIfVisible}>
                <button onClick={handleVisible}>Login</button>
            </div>
        </div>
    )
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired
    ,username: PropTypes.string.isRequired
    ,password: PropTypes.string.isRequired
    ,handleUsername: PropTypes.func.isRequired
    ,handlePassword: PropTypes.func.isRequired
}

export default LoginForm