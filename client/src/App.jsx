import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PaymentComponent from "./components/PaymentForm";
import Success from "./components/Success";
import Failure from "./components/Failure";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PaymentComponent />} />
          <Route path="/payment-success" element={<Success />} />
          <Route path="/payment-failure" element={<Failure />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
