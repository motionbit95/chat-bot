import React from "react";
import { Typography, Icon } from "antd";
import Chatbot from "./Chatbot/Chatbot";
const { Title } = Typography;

function App() {
  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "auto",
        backgroundColor: "#f5f5f5",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          // justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          gap: "1rem",
        }}
      >
        <img width={"40px"} height={"40px"} src={require("./logo.png")} />{" "}
        <div>
          <div style={{ fontWeight: "bold", fontSize: "20px" }}>MOTIONBIT</div>
          <div>깔끔하고 트렌디한 웹 플랫폼을 제작해드립니다.</div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Chatbot />
      </div>
    </div>
  );
}

export default App;
