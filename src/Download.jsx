// import React, { useEffect, useRef } from 'react';
// import { toPng } from 'html-to-image';
// import Template from './Template';
// import styled from 'styled-components';


// const Container = styled.div`
// width: fit-content;
// `;

// const Download = ({ participant }) => {
//   const templateRef = useRef(null);
//   const [qrCodes, setQrCodes] = useState({});

//   const generateQrCode = async (participantId, url) => {
//     const qrCodeUrl = await QRCode.toDataURL(url);
//     setQrCodes(prevState => ({ ...prevState, [participantId]: qrCodeUrl }));
//   };

//   useEffect(() => {
//     getDatabase().then((fetchedData) => {
//       setData(fetchedData);
//       fetchedData.forEach(participant => {
//         generateQrCode(participant.id, `https://mrsp-registration-v2.vercel.app/participant/info/${participant.id}`);
//       });
//     });
//   }, []);

//   const handleDownload = async () => {
//     if (templateRef.current) {
//       const dataUrl = await toPng(templateRef.current);
//       const link = document.createElement('a');
//       link.href = dataUrl;
//       link.download = `${participant.firstName}_${participant.lastName}.png`;
//       link.click();
//     }
//   };

//   useEffect(() => {
//     handleDownload();
//   }, []);

//   return (
//     <Container>
//       <div ref={templateRef}>
//         <Template
//           name={`${participant.firstName} ${participant.lastName}`}
//           chapter={participant.chapter}
//           school={participant.schoolCompany}
//           role = {participant.role}
//           competitionCategory = {participant.competitionCategory}
//           joinAs = {participant.nonParticipant}
//           {qrCodes[participant.id] && (
//             <img src={qrCodes[participant.id]} alt={`QR code for ${participant.firstName}`} />
//           )}
//         />
//       </div>
//     </Container>
//   )
// };

// export default Download;


// import React, { useEffect, useRef, useState } from 'react';
// import { toPng } from 'html-to-image';
// import Template from './Template';
// import styled from 'styled-components';
// import QRCode from 'qrcode';

// const Container = styled.div`
//   width: fit-content;
// `;

// const Download = ({ participant }) => {
//   const templateRef = useRef(null);
//   const [qrCode, setQrCode] = useState('');

//   const generateQrCode = async (url) => {
//     const qrCodeUrl = await QRCode.toDataURL(url);
//     setQrCode(qrCodeUrl);
//   };

//   useEffect(() => {
//     const url = `https://mrsp-registration-v2.vercel.app/participant/info/${participant.id}`;
//     generateQrCode(url);
//   }, [participant.id]);

//   const handleDownload = async () => {
//     if (templateRef.current) {
//       const dataUrl = await toPng(templateRef.current);
//       const link = document.createElement('a');
//       link.href = dataUrl;
//       link.download = `${participant.firstName}_${participant.lastName}.png`;
//       link.click();
//     }
//   };

//   // useEffect(() => {
//   //   handleDownload();
//   // }, [qrCode]); // Ensure this effect runs only once when the component mounts and QR code is generated

//   return (
//     <Container>
//       <div ref={templateRef}>
//         <Template
//           name={`${participant.firstName} ${participant.lastName}`}
//           chapter={participant.chapter}
//           school={participant.schoolCompany}
//           role={participant.role}
//           competitionCategory={participant.competitionCategory}
//           joinAs={participant.nonParticipant}
//           qrCode={qrCode} // Pass the QR code as a prop
//           handleDownload = {handleDownload}
//         />
//       </div>
//     </Container>
//   );
// };

// export default Download;


import React, { useEffect, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import Template from './Template';
import styled from 'styled-components';
import QRCode from 'qrcode';

const Container = styled.div`
  width: fit-content;
`;

const Download = ({ participant }) => {
  const templateRef = useRef(null);
  const [qrCode, setQrCode] = useState('');

  const generateQrCode = async (url) => {
    const qrCodeUrl = await QRCode.toDataURL(url);
    setQrCode(qrCodeUrl);
  };

  useEffect(() => {
    const url = `https://mrsp-registration-v2.vercel.app/participant/info/${participant.id}`;
    generateQrCode(url);
  }, [participant.id]);

  const handleDownload = async () => {
    if (templateRef.current && qrCode) {
      const dataUrl = await toPng(templateRef.current);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${participant.firstName}_${participant.lastName}.png`;
      link.click();
    }
  };

  useEffect(() => {
    if (qrCode) {
      handleDownload();
    }
  }, [qrCode]);

  return (
    <Container>
      <div ref={templateRef}>
        <Template
          name={`${participant.firstName} ${participant.lastName}`}
          chapter={participant.chapter}
          school={participant.schoolCompany}
          role={participant.role}
          competitionCategory={participant.competitionCategory}
          joinAs={participant.nonParticipant}
          qrCode={qrCode} // Pass the QR code as a prop
        />
      </div>
    </Container>
  );
};

export default Download;
