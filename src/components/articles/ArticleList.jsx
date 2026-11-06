import { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';


function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://realworld.habsida.net/api/articles')
      .then((res) => {
        if (!res.ok) throw new Error('error' + res.status);
        return res.json();
      })
      .then((data) => setArticles(data.articles))
      .catch((err) => setError(err.message)
        .finally(() => setLoading(false)));
  }, []);
  if ((loading))
    return <p>loading...</p>;
  if (error) {
    return <p>mistake:{error}</p>;
  }
  return (
    <>
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </>
  );
}
export default ArticleList;