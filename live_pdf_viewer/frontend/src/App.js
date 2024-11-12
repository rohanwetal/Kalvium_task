// import React, { useState, useEffect } from 'react';
// import { FiZoomIn, FiZoomOut } from "react-icons/fi";
// import { Document, Page } from 'react-pdf';
// import { io } from 'socket.io-client';
// import { pdfjs } from 'react-pdf';
// import 'animate.css';

// // Set PDF.js worker source
// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`;

// const socket = io('http://localhost:5000', {
//   withCredentials: true
// });  // Connect to the backend server

// function App() {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [zoomLevel, setZoomLevel] = useState(1);  // State for zoom level
//   const [pdfUrl, setPdfUrl] = useState('/Rohan_Wetal_Kalvium_Task.pdf');  // Default PDF file path

//   useEffect(() => {
//     // Listen for page change broadcast from server
//     socket.on('page-changed', (pageNum) => {
//       setPageNumber(pageNum);
//     });

//     return () => {
//       socket.off('page-changed'); // Clean up the listener on unmount
//     };
//   }, []);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   const goToPage = (pageNum) => {
//     if (pageNum >= 1 && pageNum <= numPages) {
//       setPageNumber(pageNum);
//       socket.emit('change-page', pageNum);  // Send page change event to backend
//     }
//   };

//   const zoomIn = () => {
//     setZoomLevel((prevZoom) => prevZoom + 0.1);  // Zoom in by 10%
//   };

//   const zoomOut = () => {
//     setZoomLevel((prevZoom) => Math.max(0.5, prevZoom - 0.1));  // Zoom out by 10%, prevent zooming out too much
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type === 'application/pdf') {
//       setPdfUrl(URL.createObjectURL(file));  // Update PDF URL to the selected file
//       setPageNumber(1);  // Reset to first page
//     } else {
//       alert('Please select a valid PDF file.');
//     }
//   };

//   return (
//     <div
//       className="App min-h-screen flex flex-col items-center justify-center p-5"
//       style={{
//         backgroundImage: `url('/background_1.jpg')`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center'
//       }}
//     >
//       {/* Heading with bright color and larger font */}
//       <h1 className="text-5xl font-mono text-red-500 mb-6 animate__animated animate__fadeIn animate__delay-1s">
//         Kalvium Task - Rohan Wetal
//       </h1>
//       <h2 className="text-2xl font-bold text-teal-500 mb-6 animate__animated animate__fadeIn animate__delay-1s">
//         Page - {pageNumber}
//       </h2>
      
//       {/* Document Viewer - showing only one page */}
//       <div className="pdf-viewer h-[850px] bg-[#1F2937] shadow-xl p-6 mb-6 rounded-xl overflow-hidden">
//         <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
//           <Page pageNumber={pageNumber} scale={zoomLevel} />
//         </Document>
//       </div>

//       {/* Browse PDF Button */}
//       <div className="mb-6">
//         <input 
//           type="file" 
//           accept="application/pdf"
//           onChange={handleFileChange}
//           className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200"
//         />
//       </div>
      
//       {/* Controls for page navigation */}
//       <div className="controls flex gap-8 space-x-4">
//         <button
//           onClick={() => goToPage(pageNumber - 1)}
//           disabled={pageNumber <= 1}
//           className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-blue-700 hover:shadow-[0px_0px_8px_2px_rgba(0,255,0,0.6)] transition-all duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
//         >
//           ◀
//         </button>

//         {/* Zoom In Button */}
//         <button
//           onClick={zoomIn}
//           className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 hover:shadow-[0px_0px_8px_2px_rgba(0,255,0,0.6)] transition-all duration-200"
//         >
//           <FiZoomIn />
//         </button>

//         {/* Zoom Out Button */}
//         <button
//           onClick={zoomOut}
//           className="px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-blue-700 hover:shadow-[0px_0px_8px_2px_rgba(0,255,0,0.6)] transition-all duration-200"
//         >
//           <FiZoomOut />
//         </button>

//         <button
//           onClick={() => goToPage(pageNumber + 1)}
//           disabled={pageNumber >= numPages}
//           className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-blue-700 hover:shadow-[0px_0px_8px_2px_rgba(0,255,0,0.6)] transition-all duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
//         >
//           ▶
//         </button>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { FiZoomIn, FiZoomOut, FiFile } from "react-icons/fi";  // Added file icon for the button
import { Document, Page } from 'react-pdf';
import { io } from 'socket.io-client';
import { pdfjs } from 'react-pdf';
import 'animate.css';

// Set PDF.js worker source
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`;

const socket = io('http://localhost:5000', {
  withCredentials: true
});  // Connect to the backend server

function App() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1);  // State for zoom level
  const [pdfUrl, setPdfUrl] = useState('/Rohan_Wetal_Kalvium_Task.pdf');  // Default PDF file path

  useEffect(() => {
    // Listen for page change broadcast from server
    socket.on('page-changed', (pageNum) => {
      setPageNumber(pageNum);
    });

    return () => {
      socket.off('page-changed'); // Clean up the listener on unmount
    };
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= numPages) {
      setPageNumber(pageNum);
      socket.emit('change-page', pageNum);  // Send page change event to backend
    }
  };

  const zoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom + 0.1);  // Zoom in by 10%
  };

  const zoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(0.5, prevZoom - 0.1));  // Zoom out by 10%, prevent zooming out too much
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfUrl(URL.createObjectURL(file));  // Update PDF URL to the selected file
      setPageNumber(1);  // Reset to first page
    } else {
      alert('Please select a valid PDF file.');
    }
  };

  return (
    <div
      className="App min-h-screen flex flex-col items-center justify-center p-5"
      style={{
        backgroundImage: `url('/background_1.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Heading with bright color and larger font */}
      <h1 className="text-5xl font-mono text-red-500 mb-6 animate__animated animate__fadeIn animate__delay-1s">
        Kalvium Task - Rohan Wetal
      </h1>
      <h2 className="text-2xl font-bold text-teal-500 mb-6 animate__animated animate__fadeIn animate__delay-1s">
        Page - {pageNumber}
      </h2>
      
      {/* Document Viewer - showing only one page */}
      <div className="pdf-viewer h-[850px] bg-[#1F2937] shadow-xl p-6 mb-6 rounded-xl overflow-hidden">
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} scale={zoomLevel} />
        </Document>
      </div>

      {/* Browse PDF Button */}
      <div className="mb-6">
        <label
          htmlFor="file-input"
          className="cursor-pointer px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center gap-2"
        >
          <FiFile className="text-xl" /> Choose PDF File
        </label>
        <input
          id="file-input"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"  // Hides the default file input
        />
      </div>
      
      {/* Controls for page navigation */}
      <div className="controls flex gap-8 space-x-4">
        <button
          onClick={() => goToPage(pageNumber - 1)}
          disabled={pageNumber <= 1}
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-blue-700 hover:shadow-[0px_0px_8px_2px_rgba(0,255,0,0.6)] transition-all duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          ◀
        </button>

        {/* Zoom In Button */}
        <button
          onClick={zoomIn}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 hover:shadow-[0px_0px_8px_2px_rgba(0,255,0,0.6)] transition-all duration-200"
        >
          <FiZoomIn />
        </button>

        {/* Zoom Out Button */}
        <button
          onClick={zoomOut}
          className="px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-blue-700 hover:shadow-[0px_0px_8px_2px_rgba(0,255,0,0.6)] transition-all duration-200"
        >
          <FiZoomOut />
        </button>

        <button
          onClick={() => goToPage(pageNumber + 1)}
          disabled={pageNumber >= numPages}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-blue-700 hover:shadow-[0px_0px_8px_2px_rgba(0,255,0,0.6)] transition-all duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          ▶
        </button>
      </div>
    </div>
  );
}

export default App;


