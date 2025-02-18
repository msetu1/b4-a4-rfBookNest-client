import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (bookInfo) => ({
        url: "/create-payment-intent",
        method: "POST",
        body: bookInfo,
      }),
    }),
    handlePaymentSuccess: builder.mutation({
      query: (paymentData) => {
console.log('payment data orderApi',paymentData)
        return {
          url: "/orders/success",
          method: "POST",
          body: paymentData,
        }
      },
    }),

    // adminOrdersData: builder.query({
    //   query: (userEmail) => ({
    //     url: "/orders/admin-order-data",
    //     method: "PUT",
    //     body: { email: userEmail }, // অবজেক্ট আকারে ইমেইল পাঠানো হচ্ছে
    //     headers: {
    //       "Content-Type": "application/json", 
    //     },
    //   }),
    // }),
    // userOrdersData: builder.query({
    //   query: (userEmail) => ({
    //     url: "/orders/user-order-data",
    //     method: "PUT",
    //     body: { email: userEmail }, // অবজেক্ট আকারে ইমেইল পাঠানো হচ্ছে
    //     headers: {
    //       "Content-Type": "application/json", 
    //     },
    //   }),
    // }),

    // acceptOrder: builder.mutation({
    //   query: (bookInfo) => ({
    //     url: "/orders/accept-order",
    //     method: "PUT",
    //     body: bookInfo,
    //   }),
    // }),
    // cancelOrder: builder.mutation({
    //   query: (bookInfo) => ({
    //     url: "/orders/cancel-order",
    //     method: "PUT",
    //     body: bookInfo,
    //   }),
    // }),
    // deleteOrder: builder.mutation({
    //   query: (orderInfo) => ({
    //     url: "/orders/delete-order",
    //     method: "PUT",
    //     body: orderInfo,
    //   }),
    // }),
  }),
});

export const {
  useAddOrderMutation,
//  useAdminOrdersDataQuery,
//   useUserOrdersDataQuery,
//   useAcceptOrderMutation,
//   useCancelOrderMutation,
//   useDeleteOrderMutation,
  useHandlePaymentSuccessMutation
} = orderApi;
