import { StoreApi, UseBoundStore } from "zustand";

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  const store = _store as WithSelectors<typeof _store>;   //将 _store强制转换为类型为 WithSelectors<typeof _store> 的 store 对象
  store.use = {};   //用于存储选择器函数
  for (const k of Object.keys(store.getState())) {  //通过调用 store 并传递一个选择器函数 (s) => s[k as keyof typeof s] 来获取对应属性的值
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);  //类型断言以确保属性键名的类型正确。
  }

  return store;   //上述代码主要简化状态的使用，避免频繁地编写选择器函数的重复代码。
};
