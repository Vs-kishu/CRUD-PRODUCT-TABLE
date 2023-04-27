import "./App.css";
import Navbar from "./Components/Navbar";
import Editproduct from "./Components/Editproduct";
import NotFound from "./Components/NotFound";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Allproducts from "./Components/Allproducts";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Allproducts />} exact />

        <Route path="/edit/:id" element={<Editproduct />} exact />
        <Route element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
