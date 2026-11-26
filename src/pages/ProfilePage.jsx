import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/pagination/Pagination.jsx';
import UserInfo from '../components/UserInfo/UserInfo.jsx';
import styles from './ProfilePage.module.css';

const API_URL = 'https://realworld.habsida.net/api';
const ARTICLES_PER_PAGE = 3;
const popularTags = ['one', 'something', 'chinese', 'english', 'french'];

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);
  const [articleResponse, setArticleResponse] = useState(null);
  const [activeTab, setActiveTab] = useState('my-articles');
  const [page, setPage] = useState(1);
  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_URL}/user`, {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load profile (${response.status})`);
        return response.json();
      })
      .then((data) => setProfile(data.user))
      .catch((error) => {
        if (error.name !== 'AbortError') setProfileError(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setProfileLoading(false);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!profile) return undefined;

    const controller = new AbortController();
    const requestKey = `${profile.username}:${activeTab}:${page}`;
    const filter =
      activeTab === 'favorited'
        ? `favorited=${encodeURIComponent(profile.username)}`
        : `author=${encodeURIComponent(profile.username)}`;

    fetch(
      `${API_URL}/articles?${filter}&limit=${ARTICLES_PER_PAGE}&offset=${(page - 1) * ARTICLES_PER_PAGE}`,
      { signal: controller.signal },
    )
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load articles (${response.status})`);
        return response.json();
      })
      .then((data) => {
        setArticleResponse({
          key: requestKey,
          articles: data.articles,
          articlesCount: data.articlesCount,
        });
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setArticleResponse({ key: requestKey, error: error.message });
        }
      });

    return () => controller.abort();
  }, [activeTab, page, profile]);

  function changeTab(tab) {
    setActiveTab(tab);
    setPage(1);
  }

  if (profileLoading) {
    return <p className={styles.status} role="status">Loading profile...</p>;
  }

  if (profileError) {
    return <p className={styles.status} role="alert">Could not load profile: {profileError}</p>;
  }

  if (!profile) return null;

  const requestKey = `${profile.username}:${activeTab}:${page}`;
  const currentResponse =
    articleResponse?.key === requestKey ? articleResponse : null;
  const articles = currentResponse?.articles || [];
  const articlesCount = currentResponse?.articlesCount || 0;
  const articlesLoading = !currentResponse;
  const articlesError = currentResponse?.error;
  const totalPages = Math.ceil(articlesCount / ARTICLES_PER_PAGE);

  return (
    <main className={styles.page}>
      <section className={styles.profileBanner} aria-label="Profile">
        {profile.image && !avatarError ? (
          <img
            className={styles.avatar}
            src={profile.image}
            alt=""
            onError={() => setAvatarError(true)}
          />
        ) : (
          <div
            className={`${styles.avatar} ${styles.avatarPlaceholder}`}
            role="img"
            aria-label={`${profile.username}'s avatar`}
          />
        )}
        <h1>{profile.username}</h1>
      </section>

      <div className={styles.content}>
        <div className={styles.tabs} role="tablist" aria-label="Profile articles">
          <button
            className={activeTab === 'my-articles' ? styles.activeTab : ''}
            type="button"
            role="tab"
            aria-selected={activeTab === 'my-articles'}
            onClick={() => changeTab('my-articles')}
          >
            My Articles
          </button>
          <button
            className={activeTab === 'favorited' ? styles.activeTab : ''}
            type="button"
            role="tab"
            aria-selected={activeTab === 'favorited'}
            onClick={() => changeTab('favorited')}
          >
            Favorited Articles
          </button>
        </div>

        <section className={styles.popularTags} aria-label="Popular tags">
          <h2>Popular tags</h2>
          <div className={styles.tagList}>
            {popularTags.map((tag) => (
              <span className={styles.tag} key={tag}>{tag}</span>
            ))}
          </div>
        </section>

        {articlesLoading && (
          <p className={styles.status} role="status">Loading articles...</p>
        )}
        {articlesError && (
          <p className={styles.status} role="alert">Could not load articles: {articlesError}</p>
        )}
        {!articlesLoading && !articlesError && articles.length === 0 && (
          <p className={styles.status}>Статей пока нет.</p>
        )}

        {!articlesLoading && !articlesError && articles.length > 0 && (
          <div className={styles.articleList}>
            {articles.map((article) => {
              const author = article.author || profile;

              return (
                <article className={styles.articleCard} key={article.slug}>
                  <div className={styles.articleHeader}>
                    <UserInfo author={author} date={article.createdAt} />
                    <span className={styles.favorites} aria-label={`${article.favoritesCount || 0} favorites`}>
                      <span aria-hidden="true">♥</span>
                      {article.favoritesCount || 0}
                    </span>
                  </div>
                  <h2 className={styles.articleTitle}>
                    <Link to={`/articles/${article.slug}`}>
                      {article.title || article.slug}
                    </Link>
                  </h2>
                  <p className={styles.description}>{article.description}</p>
                  <div className={styles.articleTags}>
                    {(article.tagList || []).map((tag) => (
                      <span className={styles.articleTag} key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {totalPages > 1 && !articlesError && (
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        )}
      </div>
    </main>
  );
}

export default ProfilePage;
