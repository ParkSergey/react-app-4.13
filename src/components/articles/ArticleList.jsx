import { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import Pagination from '../pagination/Pagination.jsx';
const LIMIT = 5;
function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    fetch(`https://realworld.habsida.net/api/articles?limit=${LIMIT}&offset=${(page - 1) * LIMIT}`,
      { signal: controller.signal }
  )
        .then((res) => {
          if (!res.ok) throw new Error('error' + res.status);
          return res.json();
        })
        .then((data) => {
          setArticles(data.articles);
          setTotal(data.articlesCount);
        })
        .catch((err) => {
          if (err.name !== 'AbortError') setError(err.message);
        })
    .finally(() => {
      if (!controller.signal.aborted) setLoading(false);
    });
    return () => controller.abort();
  }, [page]);
  const totalPages = Math.ceil(total / LIMIT)
  return (
    <>
      {loading && <p>loading   </p>}
      {error && <p>mistake: {error}</p>}
      {!loading && !error &&
      
        articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))
      }
        
        < Pagination page={page} totalPages={totalPages} onChange={setPage} />
      
    </>
  );
}
export default ArticleList;
