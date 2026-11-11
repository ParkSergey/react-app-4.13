import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { useParams, Link } from 'react-router';
import UserInfo from '../UserInfo/UserInfo';
import ArticleHeader from '../header/ArticleHeader';
import styles from '../pages/ArticlePage.module.css';
function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://realworld.habsida.net/api/articles/${slug}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error('mistake ' + res.status);
        return res.json();
      })
      .then((data) => {
        setArticle(data.article);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [slug]);
  return (
    <>
      <ArticleHeader />
      {loading && <p>loading...</p>}
      {error && <p>mistake: {error}</p>}
      {article && !loading && !error && (
        <article>
          <h1>{article.slug}</h1>
          <div>
            <UserInfo
              author={article.author}
              image={article.author.image}
              date={article.createdAt}
            />
          </div>
          <Markdown>
            {article.body}
          </Markdown>
        </article>
      )}
    </>
  );
}
export default ArticlePage;
