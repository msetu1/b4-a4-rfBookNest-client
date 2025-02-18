import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/feature/auth/authSlice";
import { useAddOrderMutation } from "../../redux/feature/order/orderApi";
import { toast } from "sonner";

const CheckoutForm = ({ closeModal, productInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const user = useAppSelector(useCurrentUser);

  const [addOrder] = useAddOrderMutation(); 

  useEffect(() => {
    if (productInfo?.price && productInfo?.price > 1) {
      getClientSecret({ price: productInfo?.price });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productInfo?.price]);

  // get clientSecret using addOrder
  const getClientSecret = async (price) => {
    try {
      // Use the addOrder mutation to create payment intent
      const { data } = await addOrder(price); // This unwraps the mutation response

      console.log(data)

      if (data && data.clientSecret) {
        setClientSecret(data.clientSecret); // Set the client secret from the response
      } else {
        throw new Error("Client secret is missing in the response");
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
      toast.error("Error creating payment intent");
    }
  };

  const handleSubmit = async (event) => {
    // Block native form submission
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
      setProcessing(false);
      return;
    } else {
      setCardError("");
    }

    // Confirm payment with client secret
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
      console.log(confirmError);
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      // Create payment info object
      const paymentInfo = {
        ...productInfo,
        productId: productInfo._id,
        transactionId: paymentIntent.id,
        date: new Date(),
      };
      delete paymentInfo._id;
      console.log(paymentInfo);

      try {
        // Step 1: Set payment info booking in the collection (DB)
        // (This part can be kept as it is, assuming the API logic works)
        // const { data } = await axiosSecure.post("/room-booking", paymentInfo);
        // console.log(data);

        // // Step 2: Change room status to booked in DB
        // await axiosSecure.patch(`/room/status/${productInfo?._id}`, {
        //   status: true,
        // });

        // Step 3: Add order to Redux using addOrder mutation
        addOrder(paymentInfo); // Dispatch the mutation to store order

        // Step 4: Update UI, close modal, and redirect
        toast.success("Order Payment successfully");
        closeModal();
        navigate("/user/dashboard/view-order-history");
      } catch (err) {
        console.log(err);
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
