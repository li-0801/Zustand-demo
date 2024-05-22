import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

type TotalStoreState = {
    color: string;
    ColorTransformation: ()=> void;
  };
  
  export const useTotalStore = create<TotalStoreState>()(
      subscribeWithSelector(
        persist(
          (set) => ({
            color:'pink',
            ColorTransformation: () =>
              set(() => ({
                color: 'lightpink',
            })),
          }),
          {
            name: "total store",
          } 
        )
      )
  );