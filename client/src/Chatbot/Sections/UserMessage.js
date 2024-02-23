import React from "react";
import { List, Icon, Avatar } from "antd";

function UserMessage(props) {
  const AvatarSrc =
    props.who === "bot" ? <Icon type="robot" /> : <Icon type="smile" />;

  const handleIntent = (message, event) => {
    console.log(message);
  };

  return (
    <List.Item>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            whiteSpace: "pre-wrap",
            backgroundColor: "#6633FF",
            color: "white",
            borderRadius: "10px",
            padding: "1rem",
          }}
        >
          {props.text.text}
        </div>
      </div>
    </List.Item>
  );
}

export default UserMessage;
