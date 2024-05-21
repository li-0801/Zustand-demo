import { useEffect, useState } from "react";
import { useCatStore } from "../stores/catStore";
import { shallow } from "zustand/shallow";
import { useTotalStore } from "../stores/total";

export const CatBox = () => {
  const bigCats = useCatStore((state) => state.cats.bigCats);
  const smallCats = useCatStore((state) => state.cats.smallCats);
  const increaseBigCats = useCatStore((state) => state.increaseBigCats);
  const increaseSmallCats = useCatStore((state) => state.increaseSmallCats);
  const summary = useCatStore((state) => state.summary);
  const removeAllSmallCats = useCatStore((state) => state.removeAllSmallCats)
  const removeAllCats = useCatStore((state) => state.removeAllCats)
  const [bgColor, setBgColor] = useState<string>( useCatStore.getState().cats.smallCats>6 ? 'lightyellow' : "lightblue");

  // 这里打印两遍是因为 React 在开发模式的严格模式会导致组件渲染两次，以便检测潜在的问题
  console.log(summary());
  useEffect(() => {
    const unsub = useCatStore.subscribe(
      (state) => state.cats.smallCats,
      (smallCats, prevSmallCats) => {
        console.log(smallCats, prevSmallCats);
        if (prevSmallCats <= 6 && smallCats > 6) {
          setBgColor("lightyellow");
        } else if (prevSmallCats > 6 && smallCats <= 6) {
          setBgColor("lightblue");
        }
      },
      {
        equalityFn: shallow,
        fireImmediately: true,
      }
    );
    return unsub;
    
  }, []);

  return (
    <div className="box" style={{backgroundColor:bgColor}}>
      <h1>Cat Box</h1>
      <p>big cats: {bigCats}</p>
      <p>small cats: {smallCats}</p>
      <p>{Math.random()}</p>
      <div>
        <button onClick={increaseBigCats}>add big cats</button>
        <button onClick={increaseSmallCats}>add small cats</button>
        <button onClick={removeAllSmallCats}>remove all small cats</button>
        <button onClick={removeAllCats}>remove all cats</button>
      </div>
    </div>
  );
};
