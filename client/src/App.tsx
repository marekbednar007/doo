import NavBar from './NavBar.tsx';
import TypeForm from './TypeForm.tsx';

function App() {
  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      <NavBar title='doo' />
      <TypeForm />
      {/* <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
