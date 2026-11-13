import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { useParams } from 'react-router';
import UserInfo from '../UserInfo/UserInfo';
import Header from '../header/Header.jsx';
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
      <div className={styles.headerWrap}>
        <Header />
      </div>

      {loading && <p>loading...</p>}
      {error && <p>mistake: {error}</p>}

      {article && !loading && !error && (
        <>
          <article className={styles.title}>
            <h1 className={styles.article}>{article.slug}</h1>
            <div className={styles.author}>
              <UserInfo
                author={article.author}
                image={article.author.image}
                date={article.createdAt}
              />
            </div>
          </article>

          <div className={styles.body}>
            <Markdown>{article.body}</Markdown>
          </div>

          <div className={styles.tags}>
            {(article.tagList.length
              ? article.tagList
              : Array(9).fill('tag')
            ).map((tag, i) => (
              <span key={i}>{tag}</span>
            ))}
          </div>

          <div className={styles.userinfo}>
            <UserInfo
              author={article.author}
              image={article.author.image}
              date={article.createdAt}
            />
            <button className={styles.button}>Favorite article</button>
          </div>
        </>
      )}
    </>
  );
}

export default ArticlePage;
