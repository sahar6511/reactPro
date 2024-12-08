import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customersApi = createApi({
  reducerPath: "customersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3030" }),
  endpoints: (builder) => ({
    addNewCustomer: builder.mutation({
      query: (newCustomer) => ({
        url: "customers",
        method: "POST",
        body: newCustomer,
      }),
      invalidatesTags: ["customer"],
    }),
    getCustomerById: builder.query({
      query: (id) => `customers/${id}`,
    }),

    getLimitCustomers: builder.query({
      query: (page) => `customers?_page=${page}&_limit=2`,
      providesTags: ["customers"],
    }),
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `customers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["customers"],
    }),

    updateCustomer: builder.mutation({
      query: ({
        id,
        customerName,
        customerFamily,
        customerNationalCode,
        customerMobile,
        customerEmail,
      }) => ({
        url: `customers/${id}`,
        method: "PATCH",
        body: {
          id,
          customerName,
          customerFamily,
          customerNationalCode,
          customerMobile,
          customerEmail,
        },
      }),
      invalidatesTags: ["rooms"],
    }),
  }),
});

export const {
  useAddNewCustomerMutation,
  useGetCustomerByIdQuery,
  useGetLimitCustomersQuery,
  useDeleteCustomerMutation,
  useUpdateCustomerMutation,
} = customersApi;
