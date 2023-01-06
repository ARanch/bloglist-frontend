import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const url = `http://${blog.url}`

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonStyle = { width: "100px" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <button style={{ ...showWhenVisible, ...buttonStyle }} onClick={() => toggleVisibility()}>hide details</button>
            <button style={{ ...hideWhenVisible, ...buttonStyle }} onClick={() => toggleVisibility()}>show details</button>
          </td>
          <td width="200 px">
            {blog.title} {blog.author},
          </td>
          <td>
            <div style={showWhenVisible}>
              {blog.likes} likes, <a href={url}> {blog.url},</a>
            </div>
          </td>
        </tr>

      </tbody>
    </table>
  )
}

export default Blog