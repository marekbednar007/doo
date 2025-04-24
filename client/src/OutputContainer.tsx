import './OutputContainer.css';

interface OutputContainerProps {
  userValue?: String;
  outputValue?: String;
}

function OutputContainer({ userValue, outputValue }: OutputContainerProps) {
  return (
    <div className='output-container'>
      {userValue && <div className='user-message'>{userValue}</div>}
      {outputValue && <div className='ai-message'>{outputValue}</div>}
    </div>
  );
}

export default OutputContainer;

/*
1/ If the output is from openAI -> apply X formatting
2/ If the output is PROMPT -> apply Y formatting
*/
