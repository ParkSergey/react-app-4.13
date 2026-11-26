import Banner from '../components/banners/BannerDefault.jsx';
import Sidebar from '../components/sidebar/Sidebar.jsx';
import ArticleList from '../components/articles/ArticleList.jsx';

function HomePage() {
  return (
    <>
      <Banner />
      <Sidebar />
      <ArticleList />
    </>
  );
}

export default HomePage;
