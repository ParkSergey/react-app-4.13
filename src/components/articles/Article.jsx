import ReactMarkdown from 'react-markdown'
function Article({ article }) {
  return (
    <article>
      <h1>{article.title}</h1>
      <div className="markdown">
        <ReactMarkdown >
{article.body}
        </ReactMarkdown>
          

      </div>
    </article>
    
  )
}
export default Article