import { useEffect, useState } from "react";
import { useCatStore } from "../stores/catStore";
import { useBearStore } from "../stores/bearStore";
import { shallow } from "zustand/shallow";

export const CatBox2 = () => {
  const bigCats = useCatStore((state) => state.cats.bigCats);
  // const bears = useBearStore((state) => state.bears);
  const [bgColor, setBgColor] = useState<string>("coral");

// useEffect(()=>{
//  if(bears > bigCats){
//   setBgColor('turquoise');
//  } else{
//   setBgColor('coral');
//  }
// },[bears,bigCats])

useEffect(()=>{
  const bearUnsub = useBearStore.subscribe(
    (state) => state.bears,
    (bears) => {
      // 在bears属性发生变化时执行的回调函数
      if (bears > useCatStore.getState().cats.bigCats) {
        setBgColor('turquoise');
      } else {
        setBgColor('coral');
      }
    },
    { 
      equalityFn: shallow, 
      fireImmediately: true 
    } 
  );
  const catUnsub = useCatStore.subscribe(
    (state) => state.cats.bigCats,
    (bigCats) => {
      // 在bigCats属性发生变化时执行的回调函数
      if (bigCats > useBearStore.getState().bears) {
        setBgColor('coral');
      } else {
        setBgColor('turquoise');
      }
    },
    { 
      equalityFn: shallow,
      fireImmediately: true 
    }
  );
  return () => {
    bearUnsub(); //通过调用 `bearUnsub` ,`catUnsub`函数，取消对状态变化的订阅
    catUnsub();
  };
},[])

  return (
    <div className="box" style={{backgroundColor:bgColor}}>
      <h1>Partial States from catStore</h1>
      <p>big cats: {bigCats}</p>
      <p>{Math.random()}</p>
    </div>
  );
};
