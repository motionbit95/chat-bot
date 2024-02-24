import React, { useEffect } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { saveMessage } from "../_actions/message_actions";
import Message from "./Sections/Message";
import { List, Icon, Avatar } from "antd";
import Card from "./Sections/Card";
import UserMessage from "./Sections/UserMessage";
import { post } from "jquery";

function Chatbot() {
  const dispatch = useDispatch();
  const messagesFromRedux = useSelector((state) => state.message.messages);

  useEffect(() => {
    eventQuery("welcomeToMyWebsite");
  }, []);

  const textQuery = async (text) => {
    //  First  Need to  take care of the message I sent
    let conversation = {
      who: "",
      content: {
        text: {
          text: text,
        },
      },
    };

    dispatch(saveMessage(conversation));
    // console.log('text I sent', conversation)

    // We need to take care of the message Chatbot sent
    const textQueryVariables = {
      text,
    };
    try {
      //I will send request to the textQuery ROUTE
      const response = await post(
        "https://port-0-chat-bot-17xco2nlszge3vt.sel5.cloudtype.app/api/dialogflow/textQuery",
        textQueryVariables
      );

      for (let content of response.data.fulfillmentMessages) {
        conversation = {
          who: "모션빛",
          content: content,
        };

        dispatch(saveMessage(conversation));
      }
    } catch (error) {
      conversation = {
        who: "모션빛",
        content: {
          text: {
            text: " Error just occured, please check the problem",
          },
        },
      };

      dispatch(saveMessage(conversation));
    }
  };

  const eventQuery = async (event) => {
    // We need to take care of the message Chatbot sent
    const eventQueryVariables = {
      event,
    };
    try {
      //I will send request to the textQuery ROUTE
      const response = await post(
        "https://port-0-chat-bot-17xco2nlszge3vt.sel5.cloudtype.app/api/dialogflow/eventQuery",
        eventQueryVariables
      );
      for (let content of response.data.fulfillmentMessages) {
        let conversation = {
          who: "모션빛",
          content: content,
        };

        dispatch(saveMessage(conversation));
      }
    } catch (error) {
      let conversation = {
        who: "모션빛",
        content: {
          text: {
            text: " Error just occured, please check the problem",
          },
        },
      };
      dispatch(saveMessage(conversation));
    }
  };

  const keyPressHanlder = (message, event) => {
    if (!message) {
      return alert("you need to type somthing first");
    }

    console.log(message, event);

    //we will send request to text query route
    textQuery(message);

    eventQuery(event);
  };

  const renderCards = (cards) => {
    return cards.map((card, i) => <Card key={i} cardInfo={card.structValue} />);
  };

  const renderOneMessage = (message, i) => {
    console.log("message", message, message.content.text);

    // we need to give some condition here to separate message kinds

    // template for normal text
    if (message.content && message.content.text) {
      return (
        <UserMessage key={i} who={message.who} text={message.content.text} />
      );
    } else if (message.content && message.content.payload.fields.message) {
      return (
        <Message
          key={i}
          who={message.who}
          text={message.content.payload.fields.message.stringValue}
          select={message.content.payload.fields.select.listValue.values}
          handleIntent={(message, event) => keyPressHanlder(message, event)}
        />
      );
    } else if (message.content && message.content.payload.fields.card) {
      const AvatarSrc =
        message.who === "bot" ? <Icon type="robot" /> : <Icon type="smile" />;

      return (
        <div>
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={AvatarSrc} />}
              title={message.who}
              description={renderCards(
                message.content.payload.fields.card.listValue.values
              )}
            />
          </List.Item>
        </div>
      );
    }

    // template for card message
  };

  const renderMessage = (returnedMessages) => {
    if (returnedMessages) {
      return returnedMessages.map((message, i) => {
        return renderOneMessage(message, i);
      });
    } else {
      return null;
    }
  };

  return (
    <div
      style={{
        height: 700,
        width: 700,
        // border: "3px solid black",
        borderRadius: "7px",
        padding: "10px 10px 30px 10px",
      }}
    >
      <div
        className="scroll_view"
        style={{ height: "100%", width: "100%", overflow: "auto" }}
      >
        {renderMessage(messagesFromRedux)}
      </div>
      {/* <input
        style={{
          margin: 0,
          width: "100%",
          height: 50,
          borderRadius: "4px",
          padding: "5px",
          fontSize: "1rem",
        }}
        placeholder="Send a message..."
        onKeyPress={keyPressHanlder}
        type="text"
      /> */}
    </div>
  );
}

export default Chatbot;
