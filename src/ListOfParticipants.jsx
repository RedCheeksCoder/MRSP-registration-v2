import { useEffect, useState } from "react";
import { getDatabase } from "./apiDatabase";

import styled from "styled-components";
import toast from "react-hot-toast";
import QRCode from "qrcode";
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
  width: 250px;
  height:450px;
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
  display: flex;
  justify-content: center;
  gap: 10px;

`;

const CopyButton = styled.button`
  background: #007bff;
  border: none;
  color: white;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position:bottom;

  &:hover {
    background: #0056b3;
  }
`;

const DownloadButton = styled.button`
  background: #28a745;
  border: none;
  color: white;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;


  &:hover {
    background: #1e7e34;
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
                <i className="fas fa-copy"><img src="/copy-icon.png" alt="" height={20} width={20} /></i>
              </CopyButton>
            </ButtonContainer>
            
          </ParticipantCard>
        ))}
      </Container>
      {console.log(data)}
    </>
  );
}

export default ListOfParticipants;
