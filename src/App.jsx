import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import {Route,Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import ExplorerPage from './pages/ExplorerPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage'
import AnimalDetailsPage from './pages/AnimalDetailsPage'
import AnimalType from './pages/AnimalType';
import AdminPanel from './pages/AdminPanel';
import SearchResult from './pages/SearchResult';
import UserProfile from './pages/UserProfile';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FAQPage from './pages/FAQPage';
import ChatGPT from './pages/ChatGPT'

function App() {

    //infinite scroll ?
    //update redux and createApi post section
    //filter animals (all required ?)
    //filter operation return null
    //siteyi canlıya alma ?


    return (
        <div>
            <Header/>

            <Routes>
                
                <Route path="/" element={<HomePage/>} />
                <Route path="/explorer" element={<ExplorerPage/>} />
                <Route path="/about" element={<AboutPage/>} />
                <Route path="/contact" element={<ContactPage/>} />
                <Route path="/animal/:animaltype/:id" element={<AnimalDetailsPage/>} />
                <Route path="/animal/:animaltype" element={<AnimalType/>} />
                <Route path="/admin/:id" element={<AdminPanel/>} />
                <Route path="/search/:filter" element={<SearchResult/>} />
                <Route path="/user/:id" element={<UserProfile/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<RegisterPage/>} />   
                <Route path="/faq" element={<FAQPage/>} />
                <Route path="/chatwithgpt" element={<ChatGPT/>} />


            </Routes>

            <Footer/>
           
        </div>
    );
    
}

export default App;