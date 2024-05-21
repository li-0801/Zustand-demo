import { shallow } from "zustand/shallow";
import { useCatStore } from "../stores/catStore";
import { useEffect, useState } from "react";

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
    return () => {
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
