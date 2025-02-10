import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
const apiUrl = process.env.REACT_APP_API_URL;
console.log(apiUrl);
const response = await fetch('https://www.npmjs.com/package/dotenv');

