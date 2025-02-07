// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ecommerceApi = createApi({
  reducerPath: "ecommerceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://semzy-the-man.eu-north-1.elasticbeanstalk.com/",
    prepareHeaders: (headers) => {
      const tempToken = localStorage.getItem("userDetails");
      if (tempToken) {
        const token = JSON.parse(tempToken);
        if (token?.token) {
          headers.set("authorization", `Bearer ${token.token}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: ["Cart", "Products"],
  endpoints: (builder) => ({
    getAllCategories: builder.query<void, void>({
      query: () => `category`,
    }),
    getAllProducts: builder.query<Array<any>, void>({
      query: () => `product/all`,
    }),
    getProductsById: builder.query<any, { id: number }>({
      query: ({ id }) => `product/${id}`,
    }),
    getProductsByCategoryId: builder.query<any, { id: number }>({
      query: ({ id }) => `category/${id}`,
    }),
    getCheckOutItems: builder.query<any, { id: number }>({
      query: ({ id }) => `cart/checkout?userId=${id}`,
    }),
    getpurchasedItems: builder.query<any, { id: number }>({
      query: ({ id }) => `orders/${id}`,
    }),
    addItemsToCart: builder.mutation<
      any,
      { userId: number; body: Array<{ quantity: number; productId: string }> }
    >({
      query: (data) => {
        return {
          url: `cart/addItem?userId=${data?.userId}`,
          method: "POST",
          body: data?.body,
        };
      },
      invalidatesTags: [{ type: "Cart" }],
    }),
    initiatePayment: builder.mutation<any, { userId: number }>({
      query: (data) => {
        return {
          url: `payment/initiate?userId=${data?.userId}`,
          method: "POST",
        };
      },
      invalidatesTags: [{ type: "Cart" }],
    }),
    verifyPayment: builder.mutation<any, { transactionId: any }>({
      query: ({ transactionId }) => {
        return {
          url: `payment/verify/${transactionId}`,
          method: "POST",
        };
      },
      invalidatesTags: [{ type: "Cart" }],
    }),
    signUp: builder.mutation<any, any>({
      query: ({ body }) => ({
        url: `auth/register`,
        method: "POST",
        body: body,
      }),
    }),
    logIn: builder.mutation<any, any>({
      query: ({ body }) => ({
        url: `auth/login`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
  useGetProductsByIdQuery,
  useGetProductsByCategoryIdQuery,
  useAddItemsToCartMutation,
  useVerifyPaymentMutation,
  useSignUpMutation,
  useInitiatePaymentMutation,
  useLogInMutation,
  useGetCheckOutItemsQuery,
  useGetpurchasedItemsQuery,
} = ecommerceApi;
