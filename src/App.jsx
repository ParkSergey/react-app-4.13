
import './App.css'
import Header from './components/header/Header.jsx'
import Banner from './components/banner/BannerDefault.jsx'
import Sidebar from './components/sidebar/Sidebar.jsx'
import ArticleCard from './components/articles/ArticleCard.jsx'
import Pagination from './components/pagination/Pagination.jsx'
import ArticleList from './components/articles/ArticleList.jsx'

export default function App() {
  return (
    <>
      <Header />
      <Banner />
      <Sidebar />
     <ArticleList />

      <Pagination />
    </>
  );
}

