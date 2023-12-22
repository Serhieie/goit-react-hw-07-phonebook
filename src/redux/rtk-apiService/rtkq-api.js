import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'mockApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://6582fdb302f747c8367acf8e.mockapi.io/v1/',
  }),
  tagTypes: ['Contact'],
  endpoints: builder => ({
    getAllContacts: builder.query({
      query: () => `contacts`,
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Contact', id })),
              { type: 'Contact', id: 'LIST' },
            ]
          : [{ type: 'Contact', id: 'LIST' }],
    }),

    postContact: builder.mutation({
      query: contactData => ({
        url: `contacts`,
        method: 'POST',
        body: contactData,
      }),
      invalidatesTags: [{ type: 'Contact', id: 'LIST' }],
    }),
    deleteContact: builder.mutation({
      query: id => ({
        url: `contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Contact', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllContactsQuery,
  usePostContactMutation,
  useDeleteContactMutation,
} = contactsApi;
