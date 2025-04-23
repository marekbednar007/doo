import './OutputContainer.css';

interface OutputContainerProps {
  output?: String;
  prompt?: String;
}

function OutputContainer({ output, prompt }: OutputContainerProps) {
  return (
    <div className='output-container'>
      {output} ?? {prompt}
    </div>
  );
}

export default OutputContainer;

/*
1/ If the output is from openAI -> apply X formatting
2/ If the output is PROMPT -> apply Y formatting
*/
