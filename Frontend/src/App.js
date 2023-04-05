import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";

import Register from './C&P/Pages/Register';
import Info from './C&P/Pages/Info';

import MidSection from './C&P/Components/MidSection';
import Navigation from './C&P/Navigation';
import Header from './C&P/Components/header';
import Footer from './C&P/Components/footer';
import Cancel from './C&P/Pages/Cancel';
import Success from './C&P/Pages/Success';
import Orders from './C&P/Components/Orders';
import Login from './C&P/Components/Login';
import Register2 from './C&P/Components/Register2';
function App() {

  return (
     <div className = "App">
    <BrowserRouter>
        <Routes>
              <Route path="/Info" element={[<Navigation/>,<Info/>]}></Route>
              <Route path="/shop" element={[<Navigation/>,<Header/>,<MidSection/>]}></Route>
              <Route path="/register" element={<Register2/>}></Route>
              <Route path="/cancel" element={[<Navigation/>,<Header/>,<Cancel/>]}></Route>
              <Route path="/success" element={[<Navigation/>,<Header/>,<Success/>]}></Route>
              <Route path="/orders" element={[<Navigation/>,<Header/>,<Orders/>]}></Route>
              <Route path="/" element={[<Login/>]}></Route>
              <Route path="success"></Route>
            </Routes>
        <Footer/>
        </BrowserRouter>
        </div>
  );
}

export default App;
