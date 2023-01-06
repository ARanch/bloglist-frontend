const Blog = ({ blog }) => {
  const url = `http://${blog.url}`
  return (
    <div>
      {blog.title} {blog.author}, {blog.likes} likes, <a href={url}> {blog.url},</a>
    </div >
  )
}

export default Blog