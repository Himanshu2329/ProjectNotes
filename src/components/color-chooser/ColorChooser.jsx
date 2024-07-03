import React from "react";

const ColorChooser = ({ setSelectedColor, selectedColor, isMobile }) => {
  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <label
        style={{
          fontSize: isMobile ? "15px" : "27.31px",
          fontWeight: "500",
          marginRight: "20px",
        }}
      >
        Choose colour
      </label>
      <div style={{ display: "flex" }}>
        {colors.map((color, index) => (
          <div
            key={index}
            style={{
              width: isMobile ? "15px" : "30px",
              height: isMobile ? "15px" : "30px",
              borderRadius: "50%",
              backgroundColor: color,
              border: selectedColor === color ? "2px solid black" : "",
              marginRight: index < colors.length - 1 ? "10px" : "0",
              cursor: "pointer",
            }}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorChooser;
