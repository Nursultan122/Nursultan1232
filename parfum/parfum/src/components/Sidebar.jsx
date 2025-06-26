
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHome, FaInfoCircle, FaShoppingBag, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const SidebarContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem 0;
  z-index: 1000;
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease;

  @media (min-width: 769px) {
    transform: translateX(0);
  }
`;

const Logo = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
  padding: 0 2rem;
`;

const LogoText = styled.h1`
  color: white;
  font-size: 2rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin: 0;
`;

const LogoSubtext = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin: 0.5rem 0 0 0;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled(motion.li)`
  margin: 0.5rem 0;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  color: ${props => props.isActive ? '#fff' : 'rgba(255, 255, 255, 0.8)'};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  background: ${props => props.isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};

  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }

  svg {
    margin-right: 1rem;
    font-size: 1.2rem;
  }
`;

const CartBadge = styled.span`
  background: #ff6b6b;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.6rem;
  font-size: 0.8rem;
  margin-left: auto;
  min-width: 20px;
  text-align: center;
`;

const MobileToggle = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 0.8rem;
  border-radius: 50%;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${props => props.isOpen ? 'block' : 'none'};

  @media (min-width: 769px) {
    display: none;
  }
`;

const navItems = [
  { path: '/', label: 'Главная', icon: FaHome },
  { path: '/about', label: 'О нас', icon: FaInfoCircle },
  { path: '/catalog', label: 'Каталог', icon: FaShoppingBag },
  { path: '/cart', label: 'Корзина', icon: FaShoppingCart },
];

export default function Sidebar() {
  const location = useLocation();
  const { getCartItemsCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <MobileToggle onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MobileToggle>

      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} />

      <SidebarContainer
        isOpen={isOpen}
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Logo
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <LogoText>Parfume</LogoText>
          <LogoSubtext>Элитная парфюмерия</LogoSubtext>
        </Logo>

        <NavList>
          {navItems.map((item, index) => (
            <NavItem
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <NavLink
                to={item.path}
                isActive={location.pathname === item.path}
                onClick={() => setIsOpen(false)}
              >
                <item.icon />
                {item.label}
                {item.path === '/cart' && getCartItemsCount() > 0 && (
                  <CartBadge>{getCartItemsCount()}</CartBadge>
                )}
              </NavLink>
            </NavItem>
          ))}
        </NavList>
      </SidebarContainer>
    </>
  );
}
