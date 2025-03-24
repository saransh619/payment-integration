import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { base64Decode } from "../utils/helpers";

const Failure = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const token = queryParams.get("data");
  const decoded = token ? base64Decode(token) : null;
  const product_id =
    decoded?.transaction_uuid ||
    queryParams.get("purchase_order_id") ||
    sessionStorage.getItem("current_transaction_id");

  useEffect(() => {
    if (product_id) {
      markPaymentAsFailed(product_id);
    }
  }, [product_id]);

  const markPaymentAsFailed = async (product_id) => {
    try {
      await axios.post("http://localhost:5000/api/payment-status", {
        product_id,
        status: "FAILED",
      });
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  return (
    <div className="failure-container">
      <div className="status-icon error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      </div>
      <h1>Payment Failed!</h1>
      <p className="failure-message">
        There was an issue processing your payment.
      </p>

      <div className="failure-details">
        <p>
          <strong>Transaction ID:</strong> {product_id || "Not available"}
        </p>
        <p>
          If the amount was deducted from your account, it will be refunded
          within 3-5 business days.
        </p>
      </div>

      <div className="action-buttons">
        <button onClick={() => navigate("/")} className="go-home-button">
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default Failure;
