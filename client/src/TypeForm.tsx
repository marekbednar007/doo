import { useState } from 'react';
import './TypeForm.css';
import TextAreaAutoSize from 'react-textarea-autosize';

function TypeForm() {
  // const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  // https://stackoverflow.com/questions/40676343/typescript-input-onchange-event-target-value
  // https://stackoverflow.com/questions/53943737/typescript-react-component-that-accepts-onchange-for-both-textarea-and-input
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event.currentTarget.value);
    setInputValue(event.currentTarget.value);
  };

  return (
    <>
      <div>
        <form className='form'>
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
