import React from 'react';
import "../styles.css";
import {API} from "../backend";
import Base from "./Base";

function Home() {
    //console.log("API is ",API);
    return (
        <Base title="Home Page" description="Welcome to our t-shirt store">
            <h1 className="text-white"> hey there</h1>
        </Base>
    )
}

export default Home
