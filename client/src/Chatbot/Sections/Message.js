import React from "react";
import { List, Icon, Avatar } from "antd";

function Message(props) {
  const AvatarSrc =
    props.who === "bot" ? <Icon type="robot" /> : <Icon type="smile" />;

  const handleIntent = (message, event) => {
    // console.log(message);

    props.handleIntent(message, event);
  };

  return (
    <List.Item>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            padding: "10px",
            backgroundColor: "white",
            borderRadius: "50px",
            marginRight: "10px",
          }}
        >
          <img width={"24px"} height={"24px"} src={require("../../logo.png")} />
        </div>
        <div
          style={{
            whiteSpace: "pre-wrap",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "1rem",
            maxWidth: "500px",
          }}
        >
          {props.text}
          {props.select.map((value, index) => (
            <div
              style={{
                width: "100%",
                height: "20px",
                backgroundColor: "#f1f1f1",
                borderRadius: "10px",
                padding: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10px",
              }}
              key={index}
              onClick={() =>
                handleIntent(
                  value.structValue.fields.label.stringValue,
                  value.structValue.fields.event.stringValue
                )
              }
            >
              {value.structValue.fields.label.stringValue}
            </div>
          ))}
        </div>
      </div>
    </List.Item>
  );
}

export default Message;
