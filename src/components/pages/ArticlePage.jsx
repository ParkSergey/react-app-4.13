import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { useParams } from 'react-router';
import UserInfo from '../UserInfo/UserInfo';
import Header from '../header/Header.jsx';
import loadingImage from '../../assets/images/loading.svg';
import refresh from '../../assets/images/refresh.svg';
import styles from '../pages/ArticlePage.module.css';
import Tags from '../tags/Tags.jsx';
import FavoriteArticle from '../buttons/FavoriteArticle.jsx';

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

      {loading && (
        <p className="loadingIndicator" role="status">
          <img className="loadingSpinner" src={refresh} alt="" />
          <img src={loadingImage} alt="Loading article" />
        </p>
      )}
      {error && <p>error: {error}</p>}

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
            <Tags tagList={article.tagList} />
          </div>

          <div className={styles.userinfo}>
            <UserInfo
              author={article.author}
              image={article.author.image}
              date={article.createdAt}
            />
            <FavoriteArticle />
          </div>
        </>
      )}
    </>
  );
}

export default ArticlePage;
