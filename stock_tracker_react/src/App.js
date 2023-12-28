import logo from './logo.svg';
import './index.css'
import React, { useState, useEffect } from 'react';
import logKeyboardTyping from "./keyBoardInput"


let oldData = [];

const TerminalComponent = () => {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>
        
        <span className={showCursor ? 'cursor' : ''}></span> {/* Cursor */}
      </p>
      {/* Other terminal content */}
    </div>
  );
};



function generateOldData(data) {
  return data.map((item, index) => (
    <div key={index}>
      <span>{item}</span>
    </div>
  ));
}




function App() {
  const [data, setData] = useState('');


  const [oldData, setOldData] = useState([]);

  const handleKeyboardTyping = (event) => {
    
    const newData = logKeyboardTyping(event, data, setData, oldData, setOldData);
    setData((prevData) = oldData + newData);
  };
  

  useEffect(() => {
    const handleKeyDown = (event) => {
      handleKeyboardTyping(event); 
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  useEffect(() => {
    generateOldData(oldData);
  }, [oldData]);
  

  return (
    

    <>
      <p>Welcome to the Stock Tracker Terminal</p>
      <p>Type in -help to see availavble commands</p>
      <p>***********************************************</p>
      <p id="oldData">{generateOldData(oldData)}</p>
      <div className="inputLine">
        <p id="inputArrow">Enter your command <span id="arrow"> &#8594;</span> {data}</p>
       <TerminalComponent/>
      </div>
    </>
  );
}

export default App;
