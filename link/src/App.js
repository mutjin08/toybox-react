import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import { AppProvider } from './component/mycontext';
import Layout from './component/Layout';
import Home from './component/Home';
import Page1 from './component/Page1';
import Page2 from './component/Page2';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Routes>
          <Route path="/" element={<Layout/>} >
              <Route index element={<Home/>} ></Route>
              <Route path="/page1" element={<Page1/>} ></Route>
              <Route path="/page2" element={<Page2/>} ></Route>
          </Route>
        </Routes>
      </AppProvider>
    </div>
  );
}

export default App;