import React from 'react';
import reportWebVitals from './reportWebVitals';
import { render } from "react-dom";
import {BrowserRouter,Routes,Route,} from "react-router-dom";
import App from './App';
import Favorites from "./favorites";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="favorites" element={<Favorites />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
