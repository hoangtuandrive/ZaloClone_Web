
import React from 'react';
import About from './components/about';
import Header from './components/header';
import Footers from './components/footer';
import './home.scss';
function Home() {
    return ( 
       <div className='homepage' >
            <Header />;
            <About />;
          <Footers />;
       </div>
     );
}

export default Home;
