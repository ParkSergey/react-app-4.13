import { Outlet, useLocation } from 'react-router-dom'
import Header from '../header/Header.jsx'


function Layout() {
  const location = useLocation();
  return (
    <>
      <Header key={location.pathname} />
      <Outlet />
    </>
  );
}
export default Layout