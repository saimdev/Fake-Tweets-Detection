import './App.css';
import {Home} from './Pages/Home';
import { ContactUs } from './Pages/ContactUs';
import { Reports } from './Pages/Reports';
import { Register } from './Pages/Register';
import { Signin } from './Pages/Signin';
import { Profile } from './Pages/Profile';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { HowToUse } from './Pages/HowToUse';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={[<Home />]}
            path="/"
          />
          <Route element={[<Home />]}
            path="/home"
          />
          <Route element={[<ContactUs />]}
            path="/contact"
          />
          <Route element={[<Reports />]}
            path="/reports"
          />
          <Route element={[<HowToUse />]}
            path="/howtouse"
          />
          <Route element={[<Profile />]}
            path="/profile"
          />
          <Route element={[<Signin />]}
            path="/signin"
          />
          <Route element={[<Register />]}
            path="/register"
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;