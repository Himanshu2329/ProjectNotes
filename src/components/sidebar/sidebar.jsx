import React, { useEffect, useRef, useState } from "react";
import "./sidebar.css";
import ColorChooser from "../color-chooser/ColorChooser";


const Sidebar = ({
  notes,
  setNotes,
  setSelectedNote,
  selectedNote,
  isMobile,
  toggleView,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const modalRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState("");
  const closeDialog = () => {
    setIsOpen(false);
  };
  function generateUniqueId() {
    const timestamp = new Date().getTime(); // Current timestamp in milliseconds
    const randomNum = Math.floor(Math.random() * 1000000); // Random number between 0 and 999999
    const uniqueId = `id-${timestamp}-${randomNum}`;
    return uniqueId;
}
  //handling creating notes group logic
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const id = generateUniqueId();
    setNotes((prev) => {
      return [
        ...prev,
        { id, name: groupName, bgColor: selectedColor, data: "" },
      ];
    });
    setGroupName("");
    setSelectedColor("");
    closeDialog();
  };

  console.log({ notes, selectedColor });

  //handling close dialogbox
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeDialog();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div style={{display:"flex", flexDirection:"column", height:"100%"}}>
      <div style={{marginTop:"15px", paddingLeft:"20px"}}>
        <span style={{ fontSize: "30px" }}>
          <b>Pocket Notes</b>
        </span>
      </div>
      <div
        style={{ paddingLeft: "40px", marginTop: "20px", marginBottom: "20px" }}
      >
        <button className="dark-button" onClick={() => setIsOpen(true)}>
          + Create Notes group
        </button>
      </div>
      <div
        style={{
          paddingLeft: "30px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {notes.map((note) => {
          let logoText =
            note.name.length > 1
              ? note.name.slice(0, 2)
              : note.name.slice(0, 1);
          return (
            <div
              style={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
                // backgroundColor: "red",
                padding: "15px 15px",
                borderTopLeftRadius: "15px",
                borderBottomLeftRadius: "15px",
                cursor: "pointer",
                backgroundColor:
                  selectedNote?.id === note.id ? "rgba(247, 236, 220, 1)" : "",
              }}
              key={note.id}
              onClick={() => {
                toggleView();
                setSelectedNote(note);
              }}
            >
              <div
                style={{
                  width: "68px",
                  height: "68px",
                  borderRadius: "50px",
                  backgroundColor: note.bgColor,
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
              <div style={{ fontSize: "20px", fontWeight: "500" }}>
                {note.name}
              </div>
            </div>
          );
        })}
      </div>

      {isOpen && (
        <div className="dialog-overlay">
          <div className="dialog" ref={modalRef}>
            <label
              style={{
                fontSize: isMobile ? "15px" : "29px",
                fontWeight: "500",
              }}
            >
              Create New Notes Group
            </label>
            <form onSubmit={handleFormSubmit}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div
                  style={{ display: "flex", gap: "10px", marginTop: "20px" }}
                >
                  <label
                    style={{
                      fontSize: isMobile ? "15px" : "27.31px",
                      fontWeight: "500",
                      marginRight: "10px",
                    }}
                  >
                    Group Name
                  </label>
                  <input
                    placeholder="Enter your group name...."
                    type="text"
                    id="groupName"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    required
                  />
                </div>
                <ColorChooser
                  selectedColor={selectedColor}
                  setSelectedColor={(color) => setSelectedColor(color)}
                  isMobile={isMobile}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: isMobile ? "center" : "flex-end",
                }}
              >
                <button
                  className="create-button"
                  type="submit"
                  disabled={!selectedColor || !groupName}
                  style={{
                    cursor:
                      !selectedColor || !groupName ? "not-allowed" : "pointer",
                  }}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
