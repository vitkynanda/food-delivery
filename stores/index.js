import { create } from "zustand";
import tabSlice from "./tabSlice";

export const useGlobalStore = create((...a) => ({
  ...tabSlice(...a),
}));
