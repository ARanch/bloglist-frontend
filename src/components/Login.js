import { useState } from 'react'
import loginService from '../services/login'


const LoginForm = (props) => {
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log(`logging in ${username} with pass ${password}`)

        try {
            const user = await loginService.login({ username, password })
            console.log('👤', 'trying to log user')
            console.log('👤', user)
            props.onLogin(username)
        } catch (error) {
            console.log(error)
            console.log('❌', 'an error occured')
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <div>
                <input input="username" name="Username" placeholder="Username"
                    onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>
                <input input="password" name="password" placeholder="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    )
}

export default LoginForm