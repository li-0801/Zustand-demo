import { StateCreator, create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "../utils/createSelectors";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";

type TCatStoreState = {
  cats: {
    bigCats: number;
    smallCats: number;
  };
  increaseBigCats: () => void;
  increaseSmallCats: () => void;
  summary: () => void;
  removeAllSmallCats: () => void;
  removeAllCats: () => void;
};

const createCatSlice: StateCreator<
  TCatStoreState, 
  [
    ["zustand/immer", never],  //定义所使用的插件的类型
    ["zustand/devtools", unknown],
    ["zustand/subscribeWithSelector",unknown],
    ["zustand/persist", unknown]
  ]
  
> = (set, get) => ({
  cats: {
    bigCats: 0,
    smallCats: 0,
  },
  // 可以调用接口
  // fetchData: async () => {
  //   set(() => ({ loading: true }))
  //   try {
  //     const response = await fetch('/api/data')
  //     const data = await response.json()
  //     set(state => ({bigCats:state.cats.smallCats++, data, loading: false }))
  //   } catch (error) {
  //     set(state => ({ error, loading: false }))
  //   }
  // },
  increaseBigCats: () =>  
    set((state) => {
      state.cats.bigCats++;
    }),
  increaseSmallCats: () => 
    set((state) => {
      state.cats.smallCats++;
    }),
  summary: () => {
    const total = get().cats.bigCats + get().cats.smallCats;
    return `There are ${total} cats in total. `;
  }, 
  removeAllSmallCats : () => set((state) => {
    state.cats.smallCats = 0;
  }),
  removeAllCats : () => set((state) => {
    state.cats.smallCats = 0;state.cats.bigCats = 0;
  }),
  }); 

  // 进行导出
export const useCatStore = createSelectors(
  create<TCatStoreState>()(
    immer(
      devtools(
        //监听
        subscribeWithSelector( 
          // 缓存
          persist(
            (set, get) => ({ 
            cats: {
              bigCats: 0,
              smallCats: 0,
            },
            increaseBigCats: () =>
              set((state) => {
                state.cats.bigCats++;
              }),
            increaseSmallCats: () => 
              set((state) => {
                state.cats.smallCats++;
              }),
            summary: () => {
              const total = get().cats.bigCats + get().cats.smallCats;
              return `There are ${total} cats in total. `;
            },
            removeAllSmallCats : () => set((state) => {
              state.cats.smallCats = 0;
            }),
            removeAllCats : () => set((state) => {
              state.cats.smallCats = 0;state.cats.bigCats = 0;
            }),
            }), 
            // createCatSlice,
          {
            name: "cat store", // 缓存名称
          }
          )
        ),
        {
          enabled: true,  // 启用插件
          name: "cat store",  //在开发者工具中显示的名称
        }
      )
    )
  )
);
