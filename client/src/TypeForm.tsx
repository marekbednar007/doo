import { useState, FormEvent } from 'react';
import './TypeForm.css';
import TextAreaAutoSize from 'react-textarea-autosize';
import OutputContainer from './OutputContainer.tsx';

function TypeForm() {
  // const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      // const response = await fetch('http://localhost:3000/api/postMessage', {
      const response = await fetch('/api/postMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: inputValue }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit message');
      }

      const data = await response.json();
      setOutputValue(data);
      console.log('Response:', data);
      // console.log('Typeof response:', typeof data); // String
      setInputValue('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // https://stackoverflow.com/questions/40676343/typescript-input-onchange-event-target-value
  // https://stackoverflow.com/questions/53943737/typescript-react-component-that-accepts-onchange-for-both-textarea-and-input
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event.currentTarget.value);
    setInputValue(event.currentTarget.value);
  };

  return (
    <>
      <div className='chat-container'>
        <OutputContainer output={outputValue} />
        <form className='form' onSubmit={handleSubmit}>
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
