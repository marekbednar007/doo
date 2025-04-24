import './NavBar.css';
// import { useState, useEffect } from 'react';

// https://chesteralan.medium.com/how-to-make-the-navigation-bar-sticky-on-scrolling-in-react-a7ee629fe30c
function NavBar({ title }: { title: string }) {
  // const [isSticky, setIsSticky] = useState(false);

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  // const handleScroll = () => {
  //   if (window.pageXOffset > 0) {
  //     setIsSticky(true);
  //   } else {
  //     setIsSticky(false);
  //   }
  // };

  return (
    <>
      {/* <nav className={isSticky ? 'sticky' : ''}> */}
      <div className='navBar-container'>
        <div className='nav-spacer'></div>
        <header className='navBar'>
          <h1>{title}</h1>
        </header>

        <div className='button-container'>
          <button className='button-login'>Login</button>
          <button className='button-signup'>Sign up</button>
        </div>
      </div>
      {/* <div style={{ marginTop: isSticky ? '50px' : '0' }}></div> */}
    </>
  );
}
export default NavBar;
