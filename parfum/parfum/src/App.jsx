
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';
import './App.css';

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow-x: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    opacity: 0.1;
    z-index: -1;
  }
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 280px;
  padding: 0;
  min-height: 100vh;

  @media (max-width: 768px) {
    margin-left: 0;
    padding-top: 60px;
  }
`;

export default function App() {
  return (
    <CartProvider>
      <Router>
        <AppContainer>
          <Sidebar />
          <MainContent>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </AnimatePresence>
          </MainContent>
        </AppContainer>
      </Router>
    </CartProvider>
  );
}
