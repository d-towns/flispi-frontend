import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import SearchPage from './pages/SearchPage'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import BlogHome from './pages/BlogHome';
import Footer from './components/Footer';
import StaffPage from './pages/StaffPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import BlogPage from './pages/BlogPage/BlogPage';
import ProfilePage from './pages/ProfilePage';
import { Auth0ProviderWithNavigate } from './context/Auth0Provider';
import { AuthenticationGuard } from './components/AuthGuard';
import PrivacyPolicyPage from './pages/PrivacyPolicy';
import TermsPage from './pages/TermsPage';
import Aos from "aos";
import 'aos/dist/aos.css';
Aos.init();


// Define your root component

const Root = () => {
  return (
    <>
      <Auth0ProviderWithNavigate>
        <Navbar />
        <Outlet />
        <Footer/>
      </Auth0ProviderWithNavigate>
    </>
  )
}

// Define your routes using JSX elements
const routes = (
  <React.Fragment>
    <Route path='/' element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path='search' element={<SearchPage />}/>
      <Route path='property/:id' element={<PropertyDetailsPage />} />
      <Route path='blog' element={<BlogHome />} />
      <Route path='blog/:slug' element={<BlogPage />} />
      <Route path='about' element={<StaffPage/>} />
      <Route path='staff' element={<StaffPage/>} />
      <Route path='board' element={<StaffPage/>} />
      <Route path='contact' element={<ContactPage/>} />
    <Route path='login' element={<LoginPage/>} />
      <Route path='profile' element={<AuthenticationGuard component={ProfilePage} />} />
      <Route path='policy' element={<PrivacyPolicyPage />} />
      <Route path='terms' element={<TermsPage />} />
    </Route>
  </React.Fragment>
);

const routeArray = createRoutesFromElements(routes);

function App() {
  document.title = "Flint Property Search";
  const router = createBrowserRouter(routeArray);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
