import { useState } from 'react'
import loginService from '../services/login'


const LoginForm = (props) => {
    const [password, setPassword] = useState('')
    const [userName, setUsername] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log(`logging in ${userName} with pass ${password}`)

        try {
            const user = await loginService.login({ userName, password })
            console.log('👤', 'logged in user:', user)
            props.setUser(user.userName)
            props.setToken(user.token)
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