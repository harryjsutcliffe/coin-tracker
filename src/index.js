import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CoinDetails from "./CoinDetails";
import CoinList from "./CoinList";
import CoinChart from "./CoinChart";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <NavBar/>
        <Routes>
            {/* <Route path="/" element={<CoinChart />} /> */}
            <Route path="/" element={<CoinList />} />

            <Route path="details" element={<CoinDetails />}>
                <Route path=":id" element={<CoinDetails />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
