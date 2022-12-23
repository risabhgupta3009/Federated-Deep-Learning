import React ,{useState}from "react";
import Nav from "./Navbar/Nav";
import Uploader from "./Upload/Uploader";

function App() {
  return (
    <div
      className={true ? "dark-mode" : "light-mode"}
      style={{ height: "100%", position: "absolute", width: "100%" }}
    >
      <Nav />
      <h1>COVID 19 Detector</h1>
      <ol className="instructions"
         style={{ marginTop:50 }}
      >
        <li>Upload an X-Ray image of lungs</li>
        <li>Click submit</li>
        <li>
          You've done your part, and now it's time for our trained ML model to
          do its job
        </li>
        <li>
          The assessment will reveal whether Images contain COVID Virus by displaying
          either YES or NO
        </li>
      </ol>
      <Uploader />
    </div>
  );
}

export default App;


