import React, { useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './inc/Header';
import Footer from './inc/Footer';
import Home from './pages/Home';
import Top from './pages/Top';
import User from './pages/User';
import New from './pages/New';
import Show from './pages/Show';
import Ask from './pages/Ask';
import Job from './pages/Job';
import './scss/style.scss';

function App() {
  const [theme, setTheme] = useState('light');
  const onChangeTheme = useCallback(() => {
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <BrowserRouter>
      <div id="wrap" className={`wrap ${theme}`}>
        <Header onChangeTheme={onChangeTheme} />
        <Routes>
          <Route path="/top" element={<Top />} />
          <Route path="/user" element={<User />}>
            <Route path=":id" element={<User />} />
          </Route>

          <Route path="/new" element={<New />} />
          <Route path="/Show" element={<Show />} />
          <Route path="/Ask" element={<Ask />} />
          <Route path="/Job" element={<Job />} />

          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
