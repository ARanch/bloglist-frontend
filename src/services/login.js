import axios from 'axios'
const baseUrl = '/api/login'


/** logs the user in
 * @param {Object} credentials
 * @param {string} credentials.userName
 * @param {string} credentials.password
 */
const login = async credentials => {
	const response = await axios.post(baseUrl, credentials)
	return response.data
}

export default { login }