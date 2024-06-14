import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin:auto;
  position:relative;
  background-color: white;
`
const TemplateContainer = styled.div`
font-family:"Inter";
  width: 1280px;
  height: 550px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Info = styled.div`
  text-align:left;
  margin-right:1rem;
  padding-left:2rem;
width:700px;
`

const Name = styled.h1`
font-family:"Inter";
box-sizing:border-box;
margin: 0;
max-width: 700px;
font-size: 4rem;
color: #000;
font-weight:bold;
line-height:1;
margin-bottom:1.5rem;
`;

const Details = styled.p`
  font-size: 2rem;
  font-weight:bold;
  color: #000;
`;

const Footer = styled.div`
font-family:"Inter";
text-align:center;
color: #fff;
  font-size: 3rem;
  margin:auto;
  background-color:#000;
`

const Role = styled.h1`
  font-size:5rem;
  font-weight:700;
  margin:0;
`
const Category = styled.h2`
  font-size:3rem;
  margin:0;
`
const Logo = styled.div`
  display:flex;
  flex-direction:row;
  margin:0;
  padding: 1rem 0 0 1rem;
  height:120px;
  width:130px;
  img{
  border:none;
  background-color:white;
  padding: 0 0.1rem;
  }
`

const DotsTop = styled.img`
  position:absolute;
  right:0;
  padding:0;
`
const DotsLeft = styled.img`
  position:absolute;
  left:0;
  padding:0;

  transform: rotate(180deg);
`

const CopyButton = styled.button`
  background: #007bff;
  border: none;
  color: white;
  border-radius: 5px;
  width: 250px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  bottom:20px;
margin:auto;
margin-top:2rem;
font-size:2rem;

  &:hover {
    background: #0056b3;
  }
`;

const Template = ({ name, chapter, school, role, competitionCategory, joinAs, qrCode }) => {
  return (
    <>
    <Container>
      <Logo><img src="/logo1.png" alt="" />
      <img src="/logo2.png" alt="" />
      <img src="/logo3.png" alt="" />
      <img src="/logo4.png" alt="" />
      <img src="/logo5.png" alt="" />
      <img src="/logo6.png" alt="" />
      <img src="/logo7.png" alt="" />
      <DotsTop src="/topdots.jpg" alt="" height={200} width={200}/>
      </Logo>
    <TemplateContainer id="template">
      <Info>
        <DotsLeft src="/leftdots.jpg" alt="" height={200} width={100}/>
      <Name>{name}</Name>
      <Details>{school}</Details>
      <Details>{chapter}</Details>
      <Details>{role}</Details>
      </Info>
      {qrCode && <img src={qrCode} alt={`QR code for ${name}`} height={350} width={350}/>}
    </TemplateContainer>

    <Footer>
      <Role>{joinAs}</Role>
      <Category>{`(${competitionCategory})`}</Category>
    </Footer>
    </Container>
    </>
  );
};

export default Template;



