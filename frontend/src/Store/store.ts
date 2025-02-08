import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "../Store/slices/commonSlice";
import userReducer from "../Store/slices/userSlice";
import tasksReducer from "../Store/slices/TaskSlice";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    common: commonReducer,
    user: userReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
