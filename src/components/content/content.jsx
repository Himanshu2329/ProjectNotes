import React, { useState } from "react";
import Background from "../../assets/background.png";
import Back from "../../assets/image.png";

const Content = ({
  notes,
  setNotes,
  setSelectedNote,
  selectedNote,
  isMobile,
  toggleView,
}) => {
  console.log({ notes });
  let logoText =
    selectedNote?.name.length > 1
      ? selectedNote?.name.slice(0, 2)
      : selectedNote?.name.slice(0, 1);

  const [inputText, setInputText] = useState("");

  const handleSubmit = () => {
    // This function will be called when the arrow is clicked
    console.log("Submitted text:", inputText);
    let id = selectedNote?.id;
    const currNotes = notes.filter((note) => note.id !== id);
    let newData = [...selectedNote.data, { date: Date.now(), inputText }];
    selectedNote.data = newData;
    currNotes.push(selectedNote);
    setNotes(currNotes);
    // Clear the input after submission
    setInputText("");
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return date.toLocaleTimeString(undefined, options);
  };

  return (
    <>
      {selectedNote?.id ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                gap: "15px",
                padding: "15px 15px",
                backgroundColor: "rgba(232, 232, 232, 1)",
                alignItems: "center",
              }}
            >
              {isMobile ? (
                <div
                  style={{ width: "20px", height: "20px" }}
                  onClick={() => {
                    setSelectedNote(null);
                    toggleView();
                  }}
                >
                  <img src={Back} alt="not avilable" />
                </div>
              ) : (
                <></>
              )}
              <div
                style={{
                  width: "68px",
                  height: "68px",
                  borderRadius: "50px",
                  backgroundColor: selectedNote?.bgColor,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "24px",
                    fontStyle: "Roboto",
                    textTransform: "uppercase",
                    fontWeight: "500",
                  }}
                >
                  {logoText}
                </p>
              </div>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "500",
                  fontStyle: "Roboto",
                }}
              >
                {selectedNote.name}
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "rgba(247, 236, 220, 1)",
              flexGrow: 1,
              overflowY: "auto",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              {selectedNote.data.length > 0 ? (
                selectedNote?.data
                  ?.sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((data) => {
                    return (
                      <div style={{ display: "flex" }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "150px",
                            height: "100%",
                            margin: "30px",
                            marginRight: "0px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: isMobile ? "14px" : "18px",
                              fontWeight: "400",
                              fontStyle: "Roboto",
                            }}
                          >
                            {formatTime(data.date)}
                          </div>
                          <div
                            style={{
                              fontSize: isMobile ? "14px" : "18px",
                              fontWeight: "400",
                              fontStyle: "Roboto",
                            }}
                          >
                            {formatDate(data.date)}
                          </div>
                        </div>
                        <div
                          style={{
                            width: "calc(100% - 150px)",
                            height: "auto",
                            margin: "30px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: isMobile ? "14px" : "18px",
                              fontWeight: "400",
                              fontStyle: "Roboto",
                            }}
                          >
                            {data.inputText}
                          </span>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <></>
              )}
            </div>
          </div>
          <div
            style={{
              position: "relative",
              width: "100%",
              padding: "20px",
              backgroundColor: "rgba(247, 236, 220, 1)",
            }}
          >
            <input
              type="text"
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                outline: "none",
                width: "100%",
                height: "110px",
              }}
              placeholder="Type your message..."
              onChange={(e) => setInputText(e.target.value)}
              value={inputText}
            />
            <button
              style={{
                position: "absolute",
                right: "25px",
                bottom: "20px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "24px",
              }}
              onClick={() => {
                handleSubmit();
              }}
            >
              ➤
            </button>
          </div>
        </div>
      ) : (
        <div style={{display:"flex", flexDirection:"column", width:"100%", height:"100%", alignItems:"center", backgroundColor:"rgba(247, 236, 220, 1)"}}
          
        >
          <div style={{padding:"10px", width:"60%", marginTop:"50px"}}>
            <img
              width="100%"
              height="90%"
              src={Background}
              alt="not avilable"
            />
          </div>

          <span style={{margin:"0px",
            fontSize:"50px",
            fontWeight:"400",
            lineHeight:"58.59px",
            letterSpacing:"0.02em",
            fontFamily:"Roboto"}}
          >
            Pocket Notes
          </span>
          <span style={{width:"60%",
            margin:"0px",
            fontSize:"22px",
            lineHeight:"32px",
            fontWeight:"400"}}
           
          >
            Send and receive messages without keeping your phone online. Use
            Pocket Notes on up to 4 linked devices and 1 mobile phone
          </span>
        </div>
      )}
    </>
  );
};

export default Content;
