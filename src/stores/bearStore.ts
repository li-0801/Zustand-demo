import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

type TBearStoreState = {
  bears: number;
  color: string;
  size: string;
  increasePopulation: () => void;
  ColorTransformation: () => void;
  ColorTransformationOther: () => void;
  removeAllBears: () => void;
};

export const useBearStore = create<TBearStoreState>()(
  subscribeWithSelector(
  persist(
    (set) => ({
      bears: 0,
      color: "red",
      size: "big",
      increasePopulation: () =>
        set((state) => ({
          bears: state.bears + 1,
        })),
      ColorTransformation: () =>
        set(() => ({
          color: 'lightpink',
        })),
      ColorTransformationOther: () =>
        set(() => ({
          color: 'lightgreen',
        })),
      removeAllBears: () => set({ bears: 0 }),
    }),
    {
      name: "bear store",
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !["size", ].includes(key)  //缓存排除size属性
          )
        ),
    } 
  )
  )
);
