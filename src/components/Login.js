import { useState } from 'react'
import loginService from '../services/login'
import 'react-notifications/lib/notifications.css'
import PropTypes from 'proptypes'

const LoginForm = ({
	setUser,
	setToken,
	updateNotification
}) => {
	const [password, setPassword] = useState('')
	const [userName, setUsername] = useState('')

	LoginForm.propTypes = {
		setUser: PropTypes.func.isRequired,
		setToken: PropTypes.func.isRequired
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		console.log(`logging in ${userName} with pass ${password}`)

		try {
			const user = await loginService.login({ userName, password })
			console.log('👤', 'logged in user:', user)
			setUser(user.userName)
			setToken(user.token)
			window.localStorage.setItem('loggedUser', JSON.stringify(user))
			updateNotification('success', 'Login successful', `Hello ${user.userName}! 😀`)
		} catch (error) {
			updateNotification('error', 'username or password does not exist!', 'Login failed! 😢')
			console.log(error)
			console.log('❌', 'an error occured')
		}
	}

	return (
		<form onSubmit={handleLogin}>
			<div>
				<input id="username" name="Username" placeholder="Username"
					onChange={({ target }) => setUsername(target.value)} />
			</div>
			<div>
				<input id="password" name="password" placeholder="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<div>
				<button id="loginBtn" type="submit">Login</button>
			</div>
		</form>
	)
}

export default LoginForm