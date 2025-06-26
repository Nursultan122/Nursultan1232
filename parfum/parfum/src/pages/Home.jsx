
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const HeroSection = styled(motion.div)`
  text-align: center;
  color: white;
  z-index: 2;
  max-width: 800px;
  padding: 2rem;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const HeroButton = styled(motion(Link))`
  display: inline-block;
  padding: 1rem 3rem;
  background: linear-gradient(45deg, #ff6b6b, #ffa500);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const FloatingItem = styled(motion.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  backdrop-filter: blur(10px);
`;

const ParallaxImage = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 400px;
  background-image: url('${props => props.src}');
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    display: none;
  }
`;

const floatingItems = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  size: Math.random() * 100 + 50,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 10 + 10,
}));

export default function Home() {
  return (
    <HomeContainer>
      <FloatingElements>
        {floatingItems.map((item) => (
          <FloatingItem
            key={item.id}
            size={item.size}
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </FloatingElements>

      <ParallaxImage
        src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: -100, opacity: 0.8 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ left: '10%', top: '20%' }}
      />

      <ParallaxImage
        src="https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 100, opacity: 0.8 }}
        transition={{ duration: 1, delay: 0.7 }}
        style={{ right: '10%', top: '30%' }}
      />

      <HeroSection
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <HeroTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Parfume Elite
        </HeroTitle>
        
        <HeroSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Откройте мир изысканных ароматов
        </HeroSubtitle>
        
        <HeroButton
          to="/catalog"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Перейти в каталог
        </HeroButton>
      </HeroSection>
    </HomeContainer>
  );
}
