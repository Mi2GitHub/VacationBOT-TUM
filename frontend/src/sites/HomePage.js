import React from "react";
import ChatbBox from "../components/ChatBox";
import myImage from "./minilogo.svg"

export default function HomePage() {
    return <div>
        <h1><img src={myImage}></img>VacationBOT</h1>
        <p>Hallo, <br/>
            danke, dass du mich bei dem Projekt meiner Masterarbeit unterstützt. Hierbei hilfst du dabei, dass KI-Entwickler bessere und nutzerzentriertere KI-Anwendungen entwickeln können. <br/>
            In diesem Versuch wirst du mit einer künstlichen Intelligenz (KI) namens VacationBOT interagieren. Diese experimentelle KI-Anwendung wird dich dabei unterstützen, einen simulierten Urlaub, basierend auf deinen Anforderungen und Wünschen, zu finden und zu buchen. <br/>
            <br/>
            Bitte warte auf den Studienleiter, bevor du weitermachst.<br/>
            <br/>
            Vielen Dank!.<br/>
            <br/>
            Michael Kraus


        </p>
        <ChatbBox />
    </div>
}