import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import RequireAuth from './components/require/RequireAuth.jsx';
import HomePage from './pages/HomePage.jsx';
import Article from './pages/ArticlePage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<HomePage />} />
        <Route path="/articles/:slug" element={<Article />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route
          path="/settings"
          element={
            <RequireAuth>
              <SettingsPage />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
