import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

type TotalStoreState = {
    color: string;

  };
  
  export const useTotalStore = create<TotalStoreState>()(
    subscribeWithSelector(
    persist(
      (set) => ({
        color:'skyblue',
        
      }),
      {
        name: "total store",
      } 
    )
    )
  );