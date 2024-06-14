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
//     if (templateRef.current && qrCode) {
//       const dataUrl = await toPng(templateRef.current);
//       const link = document.createElement('a');
//       link.href = dataUrl;
//       link.download = `${participant.firstName}_${participant.lastName}.png`;
//       link.click();
//     }
//   };

//   useEffect(() => {
//     if (qrCode) {
//       handleDownload();
//     }
//   }, [qrCode]);

//   return (
//     <Container ref={templateRef}>
//       <div >
//         <Template
//           name={`${participant.firstName} ${participant.lastName}`}
//           chapter={participant.chapter}
//           school={participant.schoolCompany}
//           role={participant.role}
//           competitionCategory={participant.competitionCategory}
//           joinAs={participant.nonParticipant}
//           qrCode={qrCode} // Pass the QR code as a prop
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
  const [imagesLoaded, setImagesLoaded] = useState(false);

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
    if (qrCode && imagesLoaded) {
      const timeoutId = setTimeout(() => {
        handleDownload();
      }, 3000); // 3000 milliseconds = 3 seconds

      // Clean up the timeout to prevent memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [qrCode, imagesLoaded]);

  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

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
          qrCode={qrCode}
          onLoad={handleImageLoad} // Pass onLoad to handle image load events
        />
      </div>
    </Container>
  );
};

export default Download;


