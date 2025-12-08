import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    const location = useLocation();
    const packageInfo = location.state;

    return (
        <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl text-center text-sky-700 font-bold mb-10">Payment</h2>
            
            <div className="max-w-md mx-auto bg-base-100 shadow-xl p-8 rounded-lg">
                <p className="text-xl mb-4 font-semibold">Package: {packageInfo?.limit} Members</p>
                <p className="text-lg mb-8">Amount to Pay: <span className="text-green-600 font-bold">${packageInfo?.price}</span></p>
                
                <Elements stripe={stripePromise}>
                    <CheckoutForm packageInfo={packageInfo}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;