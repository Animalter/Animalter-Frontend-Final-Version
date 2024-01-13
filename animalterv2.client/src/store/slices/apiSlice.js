import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const animalApi = createApi({
  reducerPath: 'animalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8641/',
  }),

  endpoints: (builder) => ({
    getTypes: builder.query({ query: () => 'Typee' }),
    getGenus: builder.query({ query: () => `Genus`}),
    getAnimalById: builder.query({ query: (id) => `Animal/GetAnimalById?Id=${id}` }),
    getAnimalByType: builder.query({ query: (type) => `v1/charts/country?country_code=${type}` }),
    getAnimalByGenus: builder.query({ query: (genus) => `v1/search/multi?search_type=SONGS_ARTISTS&query=${genus}` }),
    getAnimals: builder.query({ query: () => `Animal` }),
    getUsers: builder.query({ query: () => `User` }),
    getUserById: builder.query({ query: (id) => `User/GetUserById?Id=${id}` }),
    getMyAnimal: builder.query({ query: (id)=>`Animal/GetMyAllAnimal?UserId=${id}`}) ,
    getAnimalImage: builder.query({ query: (file)=>`Image/imageName?imageName=${file}`}) ,
    getFilteredAnimals: builder.query({ query: ({genusId,typeId,age})=>`Animal/GetFilteredAnimals?genusId=${genusId}&typeId=${typeId}&ageYear=${age}`}),
    getSameTypeAnimals: builder.query({ query: (typeId)=>`Animal/GetFilteredAnimals?typeId=${typeId}`}),
    getSameGenusAnimals: builder.query({ query: (genusId)=>`Animal/GetFilteredAnimals?typeId=${genusId}`})
    
  }),
});

export const {
  useGetTypesQuery,
  useGetGenusQuery,
  useGetAnimalByIdQuery,
  useGetAnimalByTypeQuery,
  useGetAnimalByGenusQuery,
  useGetAnimalsQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetMyAnimalQuery,
  useGetAnimalImageQuery,
  useGetFilteredAnimalsQuery,
  useGetSameTypeAnimalsQuery,
  useGetSameGenusAnimalsQuery,
  
} = animalApi;