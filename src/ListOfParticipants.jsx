import { useEffect, useState } from "react";
import { getDatabase } from "./apiDatabase";

import styled from "styled-components";

// Styled-components
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px;
  font-family: "Roboto", sans-serif;
  flex-wrap: wrap;
`;

const ParticipantCard = styled.div`
  background: #e0e4fc;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 10px 5px;
  width: fit-content;
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

function ListOfParticipants() {
  const [data, setData] = useState([]);

  useEffect(function () {
    getDatabase().then((fetchedData) => setData(fetchedData));
  }, []);

  return (
    <>
      <Container>
        {data.map((participant) => (
          <ParticipantCard key={participant.id}>
            <ParticipantName>
              ID#{participant.id} {participant.firstName} {participant.lastName}
            </ParticipantName>
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
          </ParticipantCard>
        ))}
      </Container>
    </>
  );
}

export default ListOfParticipants;
