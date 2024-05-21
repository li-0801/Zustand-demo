import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";

const initialFoodValue = {
  fish: 0,
  mouse: 0,
};

export const useFoodStore = create<typeof initialFoodValue>()(
  devtools(
    subscribeWithSelector(
      persist(() => initialFoodValue, { 
        name: "food store" ,
        partialize: (state) =>
          Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !["mouse"].includes(key)  //缓存排除mouse属性
          )
        )
      })
    ),
    { name: "food store" } // 缓存名称
  ),
  
);

// 鱼 ++
export const addOneFish = () =>
  useFoodStore.setState((state) => ({ fish: state.fish + 1 }));

  // 鱼 --
export const removeOneFish = () =>
  useFoodStore.setState((state) => ({ fish: state.fish - 1 }));

  // 移除所有的鱼
export const removeAllFish = () => useFoodStore.setState({ fish: 0 });

