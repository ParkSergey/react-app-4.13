import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Header from './components/header/Header.jsx'
import Banner from './components/banner/BannerDefault.jsx'
import Sidebar from './components/sidebar/Sidebar.jsx'
import ArticleCard from './components/articles/ArticleCard.jsx'
import Pagination from './components/pagination/Pagination.jsx'

export default function App() {
  return (
    <>
      <Header />
      <Banner />
      <Sidebar />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <Pagination />
    </>
  );
}
