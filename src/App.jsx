import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header.jsx';
import Banner from './components/banners/BannerDefault.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import ArticleList from './components/articles/ArticleList.jsx';
import Article from './pages/ArticlePage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import ButtonsDemo from './pages/ButtonsDemo.jsx';

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
        <Route path='/buttons' element={<ButtonsDemo />} />
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Home />} />
        <Route path="/articles/:slug" element={<Article />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </>
  );
}
export default App;
