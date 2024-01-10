import React, { Fragment } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Link,
  Outlet,
  Navigate,
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
import SignupPage from './pages/SignupPage';
import { AuthProvider } from './hooks/useAuth';
import ProfilePage from './pages/ProfilePage';


// Define your root component
const Root = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  )
}

const ExternalRedirect = (to: any) => {
  // Use window.location for external URLs
  console.log(to);
  
  window.location.href = to;
  return null; // Render nothing since we're redirecting
};

// Define your routes using JSX elements
const routes = (
  <React.Fragment>
    <Route path='/' element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path='search' element={<SearchPage />}/>
      <Route path='property/:id' element={<PropertyDetailsPage />} />
      <Route path='blog' element={<BlogHome />} />
      <Route path='blog/:id' element={<BlogPage />} />
      <Route path='about' element={<StaffPage/>} />
      <Route path='staff' element={<StaffPage/>} />
      <Route path='board' element={<StaffPage/>} />
      <Route path='contact' element={<ContactPage/>} />
      <Route path='login' element={<LoginPage/>} />
      <Route path='signup' element={<SignupPage/>} />
      <Route path='profile' element={<ProfilePage/>} />
    </Route>

  </React.Fragment>
);

const routeArray = createRoutesFromElements(routes);

function App() {
  document.title = "Flint Property Search";
  const router = createBrowserRouter(routeArray);
  return (
    <>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </>
  );
}

export default App;
