import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:4000"
    : window.location.host;

export default function ChatBox() {
  const uiMessagesRef = useRef(null);

  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([
    { from: "VacationBOT", body: "Hallo, ich bin dein persönlicher Urlaubsplanungsassistent. Wie kann ich dir helfen?" },
  ]);

  const [socket, setSocket] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
    if (socket) {
      socket.emit("onLogin", { name: userName });
      socket.on("message", (data) => {
        setMessages([...messages, data]);
      });
    }
  }, [messages, socket, userName]);

  const supportHandler = () => {
    setIsOpen(true);
    if (!userName) {
      setUserName(prompt("Bitte gebe deinen Namen ein."));
    }
    const sk = socketIOClient(ENDPOINT);
    setSocket(sk);
  };
  const closeHandler = () => {
    setIsOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert("Fehler. Bitte tippe eine Nachricht ein.");
    } else {
      setMessages([
        ...messages,
        { body: messageBody, from: userName, to: "VacationBOT" },
      ]);
      setTimeout(() => {
        socket.emit("onMessage", {
          body: messageBody,
          from: userName,
          to: "VacationBOT",
        });
      }, 1000);
      setMessageBody("");
    }
  };

  return (
    <div className="chatbox">
      {!isOpen ? (
        <Button onClick={supportHandler} variant="primary">
          Klicke hier, um VacationBOT zu öffnen
        </Button>
      ) : (
        <Card>
          <Card.Body>
            <Row>
              <Col>
                <strong>Du bist mit VacationBOT verbunden. Bitte tippe deine Nachricht ein. </strong>
              </Col>
              <Col className="text-end">
                <Button
                  className="btn-sm btn-secondary"
                  type="button"
                  onClick={closeHandler}
                >
                  x
                </Button>
              </Col>
            </Row>
            <hr />
            <ListGroup ref={uiMessagesRef}>
              {messages.map((msg, index) => (
                <ListGroup.Item key={index}>
                  <strong>{`${msg.from}: `}</strong> {msg.body}
                </ListGroup.Item>
              ))}
            </ListGroup>
            <form onSubmit={submitHandler}>
              <InputGroup className="col-6">
                <FormControl
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  type="text"
                  placeholder="Hier Nachricht eingeben"
                ></FormControl>
                <Button type="submit" variant="primary">
                  Senden
                </Button>
              </InputGroup>
            </form>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}