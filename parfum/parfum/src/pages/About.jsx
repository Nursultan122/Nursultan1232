
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: 4rem 2rem;
  color: white;
`;

const Section = styled(motion.section)`
  max-width: 1200px;
  margin: 0 auto 4rem auto;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  text-align: center;
  margin-bottom: 3rem;
  opacity: 0.9;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const TeamCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
`;

const TeamImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-image: url('${props => props.src}');
  background-size: cover;
  background-position: center;
  margin: 0 auto 1rem auto;
  border: 3px solid rgba(255, 255, 255, 0.3);
`;

const TeamName = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

const TeamRole = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ff6b6b;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  opacity: 0.8;
`;

const teamMembers = [
  {
    name: 'Анна Иванова',
    role: 'Директор по аромату',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b631?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80'
  },
  {
    name: 'Максим Петров',
    role: 'Парфюмер',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80'
  },
  {
    name: 'София Козлова',
    role: 'Консультант',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80'
  }
];

const stats = [
  { number: '500+', label: 'Ароматов' },
  { number: '10K+', label: 'Клиентов' },
  { number: '15', label: 'Лет опыта' },
  { number: '50+', label: 'Брендов' },
];

export default function About() {
  return (
    <AboutContainer>
      <Section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          О нашем магазине
        </Title>
        
        <Description
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Parfume Elite — это эксклюзивный мир ароматов, где каждый найдет свой идеальный парфюм. 
          Мы предлагаем широкий ассортимент элитной парфюмерии от ведущих мировых брендов. 
          Наша команда экспертов поможет вам выбрать аромат, который подчеркнет вашу индивидуальность 
          и станет частью вашего неповторимого стиля.
        </Description>

        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>

        <TeamGrid>
          {teamMembers.map((member, index) => (
            <TeamCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <TeamImage src={member.image} />
              <TeamName>{member.name}</TeamName>
              <TeamRole>{member.role}</TeamRole>
            </TeamCard>
          ))}
        </TeamGrid>
      </Section>
    </AboutContainer>
  );
}
