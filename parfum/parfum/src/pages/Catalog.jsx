
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const CatalogContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  color: white;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  background: ${props => props.active ? 'linear-gradient(45deg, #ff6b6b, #ffa500)' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const ProductCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 250px;
  background-image: url('${props => props.src}');
  background-size: cover;
  background-position: center;
  position: relative;
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductName = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: white;
`;

const ProductCategory = styled.span`
  background: rgba(255, 107, 107, 0.8);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  display: inline-block;
`;

const ProductDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const ProductPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ff6b6b;
  margin-bottom: 1rem;
`;

const AddToCartButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(45deg, #ff6b6b, #ffa500);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

const products = [
  {
    id: 1,
    name: 'Chanel No. 5',
    category: 'Женские',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Легендарный аромат с нотами альдегидов, жасмина и сандала.'
  },
  {
    id: 2,
    name: 'Dior Sauvage',
    category: 'Мужские',
    price: 7200,
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Свежий и мощный аромат с нотами бергамота и амброксана.'
  },
  {
    id: 3,
    name: 'Tom Ford Black Orchid',
    category: 'Унисекс',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Роскошный и загадочный аромат с нотами черной орхидеи.'
  },
  {
    id: 4,
    name: 'Versace Bright Crystal',
    category: 'Женские',
    price: 5400,
    image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Яркий и свежий аромат с цветочными нотами.'
  },
  {
    id: 5,
    name: 'Hugo Boss Bottled',
    category: 'Мужские',
    price: 4800,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Элегантный мужской аромат с древесными нотами.'
  },
  {
    id: 6,
    name: 'Lancôme La Vie Est Belle',
    category: 'Женские',
    price: 6900,
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Сладкий и изысканный аромат счастья.'
  },
  {
    id: 7,
    name: 'Armani Code',
    category: 'Мужские',
    price: 5600,
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Соблазнительный аромат с восточными нотами.'
  },
  {
    id: 8,
    name: 'Prada Luna Rossa',
    category: 'Мужские',
    price: 6200,
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Спортивный и свежий аромат для активных мужчин.'
  },
  {
    id: 11,
    name: 'Hermès Terre d\'Hermès',
    category: 'Мужские',
    price: 9800,
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Землистый и минеральный аромат для настоящих мужчин.'
  },
  {
    id: 12,
    name: 'Gucci Bloom',
    category: 'Женские',
    price: 7800,
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Цветочный аромат с богатыми белыми цветами.'
  }
];

const categories = ['Все', 'Женские', 'Мужские', 'Унисекс'];

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState('Все');
  const { addToCart } = useCart();

  const filteredProducts = activeCategory === 'Все' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <CatalogContainer>
      <Header>
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Каталог товаров
        </Title>
      </Header>

      <FilterContainer>
        {categories.map((category, index) => (
          <FilterButton
            key={category}
            active={activeCategory === category}
            onClick={() => setActiveCategory(category)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </FilterButton>
        ))}
      </FilterContainer>

      <ProductGrid>
        <AnimatePresence>
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <ProductImage src={product.image} />
              <ProductInfo>
                <ProductCategory>{product.category}</ProductCategory>
                <ProductName>{product.name}</ProductName>
                <ProductDescription>{product.description}</ProductDescription>
                <ProductPrice>{product.price.toLocaleString()} ₽</ProductPrice>
                <AddToCartButton
                  onClick={() => handleAddToCart(product)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Добавить в корзину
                </AddToCartButton>
              </ProductInfo>
            </ProductCard>
          ))}
        </AnimatePresence>
      </ProductGrid>
    </CatalogContainer>
  );
}
