import React, { useState, useRef } from 'react';
import StockPriceComponent from './getStockPrice';



function parseCommand(command) {
    const regex = /--([^']+) ([^']+) ([^']+)/;
    const match = command.match(regex);

    if (match) {
        const command = match[1];
        const type = match[2];
        const target = match[3];
        return { command, type, target };
    }

    return null; 
}

function excuteGetRequest(command)
{
    if (command['type'] === "STOCK")
    {
        return <StockPriceComponent symbol={command['target']}/>
    }

    else if (command['type'] === "OPTION")
    {
        //Search option
    }

    else {
        return failedToRead(command); 
    }
}



function failedToRead(command)
{
    return (
        <div>
          <p className="error">Could not find command '{command}'.</p>
          <p>Type -help for help.</p>
          
        </div>
      );

}



const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const inputRef = useRef(null);
  const [oldCommands, setOldCommands] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Process input when Enter is pressed
      processInput(input);
    }
  };

  const processInput = (command) => {
    let outputContent;

    let parsaedCommand = parseCommand(command);
    
    if (command.includes('-h') || command.includes('--help')) 
    {
        outputContent = <p>You have many commands you can pick</p>;
    }
    
    else if (parsaedCommand == null)
    {
        outputContent = failedToRead(command)
    }

    else if (parsaedCommand['command'] === 'get')
    {
        outputContent = excuteGetRequest(parsaedCommand); 
    }

    else {
        
      outputContent = failedToRead(command)
    }

    // Set the output, including the entered command
    setOutput((prevOutput) => [
      ...prevOutput,
      { type: 'input', content: command }, // Save the entered command
      { type: 'output', content: outputContent }, // Set the corresponding output
    ]);

    // Save the command in oldCommands
    setOldCommands((prevCommands) => [...prevCommands, command]);
    setInput(''); // Clear the input field after processing
  };

  return (
    <div className="terminal">
      <div className="terminal-output">
        {output.map((item, index) => (
          <div key={index} className={`output-${item.type}`}>
            {item.content}
          </div>
        ))}
      </div>
      <div className="terminal-input">
        <span id="dollar">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default Terminal;