import './App.css';
import { Routes, Route } from 'react-router';
import Header from './components/header/Header.jsx';
import Banner from './components/banners/BannerDefault.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import ArticleList from './components/articles/ArticleList.jsx';
import Article from './components/pages/ArticlePage.jsx'
function Home() {
  return (
    <>
      <Header />
      <Banner />
      <Sidebar />
      <ArticleList />
    </>
  );
}

function App() {
  return (
    <>
 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Home />} />
        <Route path="/articles/:slug" element={<Article />} />
      </Routes>
    </>
  );
}
export default App;
