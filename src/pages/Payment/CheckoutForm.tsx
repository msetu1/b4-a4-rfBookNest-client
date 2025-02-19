import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/feature/auth/authSlice";
import { useAddOrderMutation, useHandlePaymentSuccessMutation } from "../../redux/feature/order/orderApi";
import { toast } from "sonner";
import { BookData } from "../../types/dataTypes";

interface CheckoutFormProps {
  closeModal: () => void;
  productInfo: BookData & { price: number }; // Define productInfo with the correct type
}

const CheckoutForm = ({ closeModal, productInfo }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const user = useAppSelector(useCurrentUser);
  const [addOrder] = useAddOrderMutation();
  const [handlePaymentSuccess] = useHandlePaymentSuccessMutation();

  useEffect(() => {
    if (productInfo?.price && productInfo.price > 1) {
      getClientSecret(productInfo.price);
    }
  }, [productInfo?.price]); // Keep the dependency on productInfo.price
  
  const getClientSecret = async (price:number) => {
    try {
      // Use the addOrder mutation to create a payment intent
      const { data } = await addOrder({ price });
  
      if (data && data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        throw new Error("Client secret is missing in the response");
      }
    } catch (error) {
      toast.error("Error creating payment intent");
      console.error(error); // Optionally log the error for debugging
    }
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessing(true);
  
    if (!stripe || !elements) {
      return;
    }
  
    const card = elements.getElement(CardElement);
  
    if (card == null) {
      return;
    }
  
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
  
    if (error) {
      setCardError(error.message as string);
      setProcessing(false);
      return;
    } else {
      setCardError("");
    }

    if (paymentMethod) {
      // You can use paymentMethod here safely
      setCardError(""); // reset card error
    }
  
    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.name,
          },
        },
      }
    );
  
    if (confirmError) {
      setCardError(confirmError.message as string);
      setProcessing(false);
      return;
    }
  
    if (paymentIntent.status === "succeeded") {
      const paymentInfo = {
        product:productInfo,
        paidStatus:true,
        transactionId: paymentIntent.id,
        orderStatus:'confirmed',
        userInfo:{
          "name": user?.name,
          "email": user?.email,
          "role": user?.role,
          "iat": user?.iat,
          "exp": user?.exp
      }
      };
     
  
      try {

        const { data, error } = await handlePaymentSuccess(paymentInfo);
  
        if (error) {
          toast.error("Failed to store payment info.");
        } else {
          if (data.success) {
            toast.success("Order Payment successfully");
            closeModal();
            navigate("/user/dashboard/view-order-history");
          } else {
            toast.error("Failed to store payment info.");
          }
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        toast.error("Failed to process order");
      }
    }
  
    setProcessing(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="flex mt-2 justify-around">
          <button
            disabled={!stripe || !clientSecret || processing}
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            {processing ? (
              <ImSpinner9 className="animate-spin m-auto " size={24} />
            ) : (
              `Pay ${productInfo?.price}`
            )}
          </button>
          <button
            onClick={closeModal}
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
    </>
  );
};

export default CheckoutForm;
