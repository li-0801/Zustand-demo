import { shallow } from "zustand/shallow";
import { useCatStore } from "../stores/catStore";
import { useEffect, useState } from "react";
import { useTotalStore } from "../stores/total";

export const CatController = () => {
  //   const { increaseBigCats, increaseSmallCats } = useCatStore();
  //   const increaseBigCats = useCatStore.use.increaseBigCats();
  //   const increaseSmallCats = useCatStore.use.increaseSmallCats();

  // const { increaseBigCats, increaseSmallCats } = useCatStore(
  //   (state) => ({
  //     increaseBigCats: state.increaseBigCats,
  //     increaseSmallCats: state.increaseSmallCats,
  //   }),
  //   shallow
  // );

  const [increaseBigCats, increaseSmallCats] = useCatStore( 
    (state) => [state.increaseBigCats, state.increaseSmallCats],
    shallow
  );
  const [bgColor, setBgColor] = useState<string>(useCatStore.getState().cats.bigCats > 6 ? "teal" : "gold");

useEffect(()=>{
  const unsub = useCatStore.subscribe(
    (state) => state.cats.bigCats,
      (bigCats, prevBigCats) => {
        console.log(bigCats, prevBigCats);
        if ( bigCats > 6) {
          console.log('222222222');
          
          setBgColor("teal");
        } else {
          setBgColor("gold"); 
        }
      },  
      {
        equalityFn: shallow,   //浅层比较
        fireImmediately: true, // 订阅创建后立即执行一次 
      }
  );
  const totalUnsub = useTotalStore.subscribe(
    (state) => state.color,
      (color) => {
        console.log(color);
        if ( color==='black') {
          setBgColor("black");
        } else {
          console.log('111111111');
           unsub()
        }
      },  
      {
        equalityFn: shallow,   //浅层比较
        fireImmediately: true, // 订阅创建后立即执行一次 
      }
  )
    return () => {
      totalUnsub();
      unsub();
    };
},[]) 
  return ( 
    <div className="box" style={{backgroundColor:bgColor}}>
      <h1>Cat Controller</h1>
      <p>{Math.random()}</p>
      <div>
        <button onClick={increaseBigCats}>add big cats</button>
        <button onClick={increaseSmallCats}>add small cats</button>
      </div>
    </div>
  );
};
