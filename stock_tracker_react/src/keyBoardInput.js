import React, { useState, useEffect } from 'react';

const logKeyboardTyping = (event, data, setData, oldData, setOldData) => {
   
    return "Hello"; 
    const { key, keyCode } = event;
  
    if (event.key === 'Backspace') {
     
      setData((prevData) => prevData.slice(0, -1));
    } else if (key === 'Shift' || keyCode === 9) {
      // Handle Shift key or Tab key press here
      // You can add specific actions or skip as intended
      return;
    } else if (event.key === 'Space') {
      setData((prevData) => prevData + ' ');
      return;
    } else if (key === 'Enter') {
      setOldData([...oldData, data]);
      console.log(oldData);
      return;
    } else {
      // For other keys, concatenate the pressed key to data
      setData((prevData) => prevData + event.key);
    }
  };


export default logKeyboardTyping;