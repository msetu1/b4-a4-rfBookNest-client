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
        return {
          url: "/orders/success",
          method: "POST",
          body: paymentData,
        }
      },
    }),

    adminOrdersData: builder.query({
      query: (userEmail) => {
        return {
          url: "/orders/admin-order-data",
          method: "PUT",
          body: { email: userEmail }, 
          headers: {
            "Content-Type": "application/json", 
          },
        }
      },
    }),

    userOrdersData: builder.query({
      query: (userEmail) => {
        return {
          url: "/orders/user-order-data",
          method: "PUT",
          body: { email: userEmail }, 
          headers: {
            "Content-Type": "application/json", 
          },
        }
      },
    }),

    acceptOrder: builder.mutation({
      query: (bookInfo) => ({
        url: "/orders/accept-order",
        method: "PUT",
        body: bookInfo,
      }),
    }),
    cancelOrder: builder.mutation({
      query: (bookInfo) => ({
        url: "/orders/cancel-order",
        method: "PUT",
        body: bookInfo,
      }),
    }),

    deleteOrder: builder.mutation({
      query: (orderInfo) => ({
        url: "/orders/delete-order",
        method: "PUT",
        body: orderInfo,
      }),
    }),
  }),
});

export const {
  useAddOrderMutation,
  useHandlePaymentSuccessMutation,
 useAdminOrdersDataQuery,
  useUserOrdersDataQuery,
  useAcceptOrderMutation,
  useCancelOrderMutation,
  useDeleteOrderMutation
} = orderApi;
