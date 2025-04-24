import ReactMarkdown from 'react-markdown';
import './OutputContainer.css';

interface OutputContainerProps {
  userValue: string[];
  outputValue: string[];
  currentResponse: string;
}

// React MarkDown:
// https://medium.com/@dimterion/react-markdown-examples-372fa1b21c0c

function OutputContainer({
  userValue,
  outputValue,
  currentResponse,
}: OutputContainerProps) {
  return (
    <div className='output-container'>
      {userValue &&
        userValue.map((el, i) => (
          <div key={i} className='user-message'>
            {el}
          </div>
        ))}
      {outputValue &&
        outputValue.map((el, i) => (
          <div key={i} className='ai-message'>
            <ReactMarkdown>{el}</ReactMarkdown>
          </div>
        ))}
      <div className='ai-message'>
        <ReactMarkdown>{currentResponse}</ReactMarkdown>
      </div>
    </div>
  );
}

export default OutputContainer;

/*
1/ If the output is from openAI -> apply X formatting
2/ If the output is PROMPT -> apply Y formatting
*/
