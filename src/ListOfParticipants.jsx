import { useEffect, useState } from "react";
import { getDatabase } from "./apiDatabase";

import styled from "styled-components";
import toast from "react-hot-toast";
import QRCode from "qrcode";
import Download from "./Download";
// Styled-components
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px;
  font-family: "Roboto", sans-serif;
  flex-wrap: wrap;
  position: relative;
`;

const ParticipantCard = styled.div`
  background: #e0e4fc;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 10px 5px;
  width: 350px;
  height:500px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ParticipantName = styled.h2`
  margin: 0;
  font-size: 1.5em;
  color: #333;
`;

const ParticipantInfo = styled.p`
  margin: 5px 0;
  color: #666;
`;

const ButtonContainer = styled.div`
position:absolute;
  bottom:0;
  left:60px;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items:center;
  gap: 10px;
  bottom:20px;
  
  a{
    text-decoration:none;
    color: #007bff;
    font-size:1rem;
    text-align:center;
  }
`;

const CopyButton = styled.button`
  background: #007bff;
  border: none;
  color: white;
  border-radius: 5px;
  width: 200px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  bottom:20px;

  &:hover {
    background: #0056b3;
  }
`;

function ListOfParticipants() {
  const [data, setData] = useState([]);
  const [qrCodes, setQrCodes] = useState({});

  const generateQrCode = async (participantId, url) => {
    const qrCodeUrl = await QRCode.toDataURL(url);
    setQrCodes(prevState => ({ ...prevState, [participantId]: qrCodeUrl }));
  };

  useEffect(() => {
    getDatabase().then((fetchedData) => {
      setData(fetchedData);
      fetchedData.forEach(participant => {
        generateQrCode(participant.id, `https://mrsp-registration-v2.vercel.app/participant/info/${participant.id}`);
      });
    });
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success("Copied to clipboard");
      })
      .catch((err) => {
        toast.error("Could not copy text: ", err);
      });
  };


  return (
    <>
      <Container>
        {data.map((participant) => (
          <ParticipantCard key={participant.id}>
            <ParticipantName>
              ID#{participant.id} {participant.firstName} {participant.lastName}
            </ParticipantName>
            {qrCodes[participant.id] && (
              <img src={qrCodes[participant.id]} alt={`QR code for ${participant.firstName}`} />
            )}

            <ParticipantInfo>
              Category: {participant.competitionCategory}
            </ParticipantInfo>
            <ParticipantInfo>Email: {participant.email}</ParticipantInfo>
            <ParticipantInfo>Phone: {participant.phoneNumber}</ParticipantInfo>
            <ParticipantInfo>
              School/Company: {participant.schoolCompany}
            </ParticipantInfo>
            <ParticipantInfo>
              Address: {participant.schoolCompanyAddress}
            </ParticipantInfo>
            <ButtonContainer>
              <CopyButton onClick={() => handleCopy(`https://mrsp-registration-v2.vercel.app/participant/info/${participant.id}`)}>
                  Copy link
                </CopyButton>
                <a href={`https://mrsp-registration-v2.vercel.app/participant/download/${participant.id}`} target="_blank" rel="noopener noreferrer">PRINT ID</a>
            </ButtonContainer>
          
          </ParticipantCard>
        ))}
      </Container>
      {console.log(data)}
    </>
  );
}

export default ListOfParticipants;

