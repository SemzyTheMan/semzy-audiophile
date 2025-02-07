import { configureStore } from "@reduxjs/toolkit";
import allReducer from "./reducer";
import { ecommerceApi } from "./services";

export const store = configureStore({
  reducer: {
    all: allReducer,
    [ecommerceApi.reducerPath]: ecommerceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ecommerceApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
