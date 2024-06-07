
import styled from "styled-components";


const Background = styled.div`
  background-image: url("/MRSP Website Phone Design.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
`;

const OuterContainer = styled.div`
  height: 100dvh;
  max-width: 300px;
  margin: auto;
  font-family: "Roboto";
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    margin-bottom: 1rem;
  }
`;
const Header = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
`;
const Enter = styled.p`
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 2rem;
`;

const Info = styled.p`
  text-align: left;
  padding-left: 0.5rem;
  white-space: wrap;
`;

const Bold = styled.span`
  font-weight: 600;
`;

function ParticipantsCard({ participant }) {
  return (
    <>
      <Background>
        <OuterContainer>
          {/* <img src="/MRSP logo.png" alt="MRSP logo" height={100} width={100} /> */}
          <Header>Hi! I'm {`${participant.firstName}`} </Header>
          <Enter>Here's my full details.</Enter>
          <Info>
            <Bold>Fullname:</Bold>
            {participant.firstName} {participant.lastName}
          </Info>
          <Info>
            <Bold>School/Company:</Bold> {participant.schoolCompany}
          </Info>
          <Info>
            {" "}
            <Bold>Category:</Bold>
            {participant.competitionCategory}
          </Info>
          <Info>
            <Bold>Email:</Bold> {participant.email}
          </Info>
          <Info>
            {" "}
            <Bold>Contact number:</Bold> {participant.phoneNumber}
          </Info>
          <Info>
            <Bold>School/Company Address:</Bold>{" "}
            {participant.schoolCompanyAddress}
          </Info>
        </OuterContainer>
      </Background>
    </>
  );
}

export default ParticipantsCard;
