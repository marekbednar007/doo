import { useState, FormEvent } from 'react';
import './TypeForm.css';
import TextAreaAutoSize from 'react-textarea-autosize';
import OutputContainer from './OutputContainer.tsx';

function TypeForm() {
  // const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [currentResponse, setCurrentResponse] = useState('');
  const [outputValue, setOutputValue] = useState<string[]>([]);
  const [userValue, setUserValue] = useState<string[]>([]);

  // #1 STREAMING RESPONSE
  /* EventSource = standard browser API:
  1/ Opens a persistent connection to the server
  2/ Automatically parses SSE-formatted responses (SSE = Server-Sent Events)
  3/ Emits JS events when data is received
  4/ Auto-reconnects if the connection drops

  https://react.dev/learn/updating-arrays-in-state
  */
  const handleSubmitStream = async (event: FormEvent) => {
    event.preventDefault();
    setUserValue((prev) => [...prev, inputValue]);

    const eventSource = new EventSource(
      '/api/stream?prompt=' + encodeURIComponent(inputValue)
    );

    eventSource.onmessage = (event) => {
      // Append each chunk to the output as it arrives
      setCurrentResponse((current) => current + event.data);
      // setOutputValue((current) => current + event.data);
    };

    eventSource.addEventListener('DONE', () => {
      setOutputValue((prev) => [...prev, currentResponse]);
      eventSource.close();
    });

    eventSource.onerror = () => {
      eventSource.close();
    };

    setCurrentResponse('');
    setInputValue('');
    // setOutputValue([]);
  };

  // // #2 ONE TIME RESPONSE
  // const handleSubmit = async (event: FormEvent) => {
  //   event.preventDefault();
  //   setUserValue(inputValue);

  //   try {
  //     // const response = await fetch('http://localhost:3000/api/postMessage', {
  //     const response = await fetch('/api/postMessage', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ prompt: inputValue }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to submit message');
  //     }

  //     const data = await response.json();
  //     setOutputValue(data);
  //     // console.log('Response:', data);
  //     // console.log('Typeof response:', typeof data); // String
  //     setInputValue('');
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  // https://stackoverflow.com/questions/40676343/typescript-input-onchange-event-target-value
  // https://stackoverflow.com/questions/53943737/typescript-react-component-that-accepts-onchange-for-both-textarea-and-input
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event.currentTarget.value);
    setInputValue(event.currentTarget.value);
  };

  return (
    <>
      <div className='chat-container'>
        <OutputContainer
          userValue={userValue}
          outputValue={outputValue}
          currentResponse={currentResponse}
          // input={inputValue}
          // props={() => {
          //   inputValue ?? outputValue;
          // }}
        />
        <form className='form' onSubmit={handleSubmitStream}>
          {/* <form className='form' onSubmit={handleSubmit}> */}
          <div className='input-container'>
            {/* https://github.com/Andarist/react-textarea-autosize */}
            <TextAreaAutoSize
              className='typingBar'
              value={inputValue}
              onChange={handleChange}
              placeholder='Message doo'
              minRows={3}
              maxRows={6}
            />
            <input className='submitButton' type='submit' value='Send' />
          </div>
        </form>
      </div>
      {/* <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div> */}
    </>
  );
}

export default TypeForm;
