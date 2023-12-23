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
      <Route path='application/ComImp' element={<ExternalRedirect to='https://www.thelandbank.org/downloads/commercial_application_221006.pdf'/>} />
  <Route path='application/ComVacLot' element={<ExternalRedirect  to='https://www.thelandbank.org/downloads/commercial_application_221006.pdf'/>} />
  <Route path='application/ResImp' element={<ExternalRedirect  to='https://www.thelandbank.org/downloads/residential_interest_form_221006.pdf'/>} />
  <Route path='application/ResVacLot' element={<ExternalRedirect to='https://www.thelandbank.org/downloads/lots_available_application_221006.pdf'/>} />
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
