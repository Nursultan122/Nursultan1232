
import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus, FaTrash, FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartContainer = styled.div`
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

const CartContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const CartItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ItemImage = styled.div`
  width: 120px;
  height: 120px;
  background-image: url('${props => props.src}');
  background-size: cover;
  background-position: center;
  border-radius: 15px;

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    margin: 0 auto;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

const ItemPrice = styled.div`
  font-size: 1.2rem;
  color: #ff6b6b;
  font-weight: 600;
`;

const ItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
    margin-top: 1rem;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 0.5rem 1rem;
`;

const QuantityButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Quantity = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  min-width: 30px;
  text-align: center;
`;

const RemoveButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff6b6b, #ff4757);
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.8rem;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
  }
`;

const CartSummary = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  margin-top: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
`;

const TotalPrice = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #ff6b6b;
  margin-bottom: 1.5rem;
`;

const CheckoutButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff6b6b, #ffa500);
  color: white;
  border: none;
  padding: 1rem 3rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  margin-right: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
`;

const ContinueButton = styled(Link)`
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  padding: 1rem 3rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px);
  }
`;

const EmptyCart = styled(motion.div)`
  text-align: center;
  padding: 4rem 2rem;
`;

const EmptyCartIcon = styled.div`
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 1rem;
`;

const EmptyCartText = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
`;

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();

  if (cart.items.length === 0) {
    return (
      <CartContainer>
        <Header>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Корзина
          </Title>
        </Header>

        <CartContent>
          <EmptyCart
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <EmptyCartIcon>
              <FaShoppingBag />
            </EmptyCartIcon>
            <EmptyCartText>Ваша корзина пуста</EmptyCartText>
            <ContinueButton to="/catalog">
              Перейти к покупкам
            </ContinueButton>
          </EmptyCart>
        </CartContent>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <Header>
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Корзина ({cart.items.length})
        </Title>
      </Header>

      <CartContent>
        <AnimatePresence>
          {cart.items.map((item, index) => (
            <CartItem
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ItemImage src={item.image} />
              
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>{item.price.toLocaleString()} ₽</ItemPrice>
              </ItemInfo>

              <ItemControls>
                <QuantityControls>
                  <QuantityButton
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaMinus />
                  </QuantityButton>
                  
                  <Quantity>{item.quantity}</Quantity>
                  
                  <QuantityButton
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaPlus />
                  </QuantityButton>
                </QuantityControls>

                <RemoveButton
                  onClick={() => removeFromCart(item.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTrash />
                </RemoveButton>
              </ItemControls>
            </CartItem>
          ))}
        </AnimatePresence>

        <CartSummary
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <TotalPrice>
            Итого: {getCartTotal().toLocaleString()} ₽
          </TotalPrice>
          
          <div>
            <CheckoutButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                alert('Спасибо за покупку! Функция оформления заказа будет добавлена в будущем.');
                clearCart();
              }}
            >
              Оформить заказ
            </CheckoutButton>
            
            <ContinueButton to="/catalog">
              Продолжить покупки
            </ContinueButton>
          </div>
        </CartSummary>
      </CartContent>
    </CartContainer>
  );
}
