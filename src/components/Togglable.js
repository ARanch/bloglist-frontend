import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

/** Example container-component for hiding and showing its children.
 * <Togglable buttonLabel="show...">
 */
const Togglable = forwardRef((props, refs) => {
	Togglable.displayName = 'Togglable' // 🐞 fixes "ForwardRef(Togglable) displayName is missing" warning
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	Togglable.propTypes = {
		buttonLabel: PropTypes.string.isRequired
	}

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(refs, () => {
		return {
			toggleVisibility
		}
	})

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div style={showWhenVisible} className='togglableContent'>
				{props.children}
				<button onClick={toggleVisibility}>close</button>
			</div>
		</div>
	)
})

export default Togglable