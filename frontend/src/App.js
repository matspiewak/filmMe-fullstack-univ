import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "./components/Navbar";
import MainBody from "./components/MainBody";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <MainBody />
        </div>
      </Router>
    );
  }
}

export default App;
