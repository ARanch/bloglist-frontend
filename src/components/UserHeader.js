const UserHeader = ({ user, updateNotification }) => {
	const clearUser = async () => {
		window.localStorage.removeItem('loggedUser')
		const timeout = 700
		updateNotification('success', 'Logout successful', 'Goodbye! 👋', timeout)
		// reload after 0,5 secs
		setTimeout(() => {
			window.location.reload()
		}, timeout + 100)
	}
	return (
		<div>
			{user} logged in. <button onClick={clearUser}>Logout</button>
		</div>
	)
}

export default UserHeader