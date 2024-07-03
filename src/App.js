import "./App.css";

import Sidebar from "./components/sidebar/sidebar";
import Content from "./components/content/content";
import { useEffect, useState } from "react";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [notes, setNotes] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);
  console.log({ selectedNote });
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleView = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      {isMobile ? (
        <div style={{width:"100%", height:"100%"}}>
          {showSidebar ? (
            <Sidebar
              notes={notes}
              setNotes={setNotes}
              setSelectedNote={setSelectedNote}
              selectedNote={selectedNote}
              isMobile={isMobile}
              toggleView={toggleView}
            />
          ) : (
            <Content
              notes={notes}
              setNotes={setNotes}
              setSelectedNote={setSelectedNote}
              selectedNote={selectedNote}
              isMobile={isMobile}
              toggleView={toggleView}
            />
          )}
        </div>
      ) : (
        // <div style={{display:"flex", height:"100vh"}}>
        //   <div style={{width:"30%", height:"100%"}}>
        //     <Sidebar
        //       notes={notes}
        //       setNotes={setNotes}
        //       setSelectedNote={setSelectedNote}
        //       selectedNote={selectedNote}
        //       isMobile={isMobile}
        //       toggleView={toggleView}
        //     />
        //   </div>
        //   <div style={{width:"70%", height:"100%"}}>
        //     <Content
        //       notes={notes}
        //       setNotes={setNotes}
        //       setSelectedNote={setSelectedNote}
        //       selectedNote={selectedNote}
        //       isMobile={isMobile}
        //       toggleView={toggleView}
        //     />
        //   </div>
        // </div>
        <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" }}>
  <div style={{ width: "30%", height: "100%", overflow: "hidden" }}>
    <Sidebar
      notes={notes}
      setNotes={setNotes}
      setSelectedNote={setSelectedNote}
      selectedNote={selectedNote}
      isMobile={isMobile}
      toggleView={toggleView}
    />
  </div>
  <div style={{ width: "70%", height: "100%", overflow: "hidden" }}>
    <Content
      notes={notes}
      setNotes={setNotes}
      setSelectedNote={setSelectedNote}
      selectedNote={selectedNote}
      isMobile={isMobile}
      toggleView={toggleView}
    />
  </div>
</div>

      )}
   </>
  );
}

export default App;
