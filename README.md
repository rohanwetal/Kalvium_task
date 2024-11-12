# Kalvium_task
Kalvium Task of co-viewer for PDF slides

PDF Viewer with Thumbnail Preview and Zoom Controls
Project Overview
This project is a PDF viewer application built with React. It allows users to view PDF documents with full-page viewing capabilities, zoom in and out, and navigate through pages using thumbnail previews. The application supports dynamic page changes, live updates, and smooth transitions between pages.

**Features**
PDF Viewing: View a PDF document in full-page mode with the ability to zoom in and out.
Thumbnail Previews: Display all pages of the PDF in smaller thumbnails on the left side, enabling easy navigation.
Zoom Controls: Zoom in and out of the PDF document to adjust the page view.
Page Navigation: Navigate between pages using either the thumbnail previews or arrow buttons.
Responsive Layout: The layout adjusts to various screen sizes for a seamless experience.
Socket Integration: Real-time synchronization for page changes using Socket.IO (ideal for multi-user applications).
Technologies Used
React.js: For building the user interface and handling state.
react-pdf: To render PDF documents within the React application.
Socket.IO: For real-time communication between the frontend and backend (if you plan to implement multi-user support).
pdf.js: For rendering PDFs on the client-side and generating thumbnails of each page.
Tailwind CSS: For styling the application with a responsive, clean design.
Setup Instructions
To run this project locally, follow the steps below:

**Clone the repository:**

bash
Copy code
git clone https://github.com/rohanwetal/Kalvium_task.git
cd pdf-viewer-app
Install dependencies:

Ensure you have Node.js installed. Then run the following command to install the necessary dependencies:

bash
Copy code
npm install
Start the development server:

Run the following command to start the app:

bash
Copy code
npm start
Your app should now be running on http://localhost:3000.

**Folder Structure**
plaintext
Copy code
src/
├── components/
│   ├── App.js              # Main component containing PDF viewer, page controls, and thumbnail previews.
│   ├── Thumbnail.js        # Component for displaying individual page thumbnails.
├── assets/
│   ├── background_1.jpg    # Background image for the app.
│   ├── Rohan_Wetal_Kalvium_Task.pdf  # Example PDF file.
└── App.css                 # CSS file for global styling (using Tailwind CSS).

**How to Use**
Choose a PDF: Upload a PDF file by clicking the "Choose File" button, or use the default PDF provided in the project.
Navigate Pages: Use the arrow buttons (◀ and ▶) to move between pages or click on any thumbnail on the left to jump directly to that page.
Zoom In/Out: Use the Zoom In (+) and Zoom Out (-) buttons to adjust the page zoom level.

**Known Issues**
There may be performance issues when dealing with very large PDF files or documents with many pages.
Currently, the app only supports loading PDF files from a local path or URL. For dynamic loading from a database or external server, modifications are needed.
Future Enhancements
Multi-user support: Integrate real-time collaborative viewing where multiple users can see the same page at the same time using Socket.IO.
Save State: Remember the user's current page and zoom level in local storage for a better user experience.
Search Functionality: Add a search feature to locate text within the PDF document.
Dark/Light Mode: Allow the user to toggle between dark and light modes for better accessibility. 

![Screenshot (650)](https://github.com/user-attachments/assets/f992871f-33e5-42cb-8261-b307dbf927cf)

