import { useEffect, useState } from "react";
import {
  useFoodStore,
  addOneFish,
  removeOneFish,
  removeAllFish,
} from "../stores/foodStore";
import { useBearStore } from "../stores/bearStore";

import { shallow } from "zustand/shallow";

export const FoodBox = () => {
  const [bgColor, setBgColor] = useState<string>(useFoodStore.getState().fish > 6 ? "salmon" : "lavender");
  const bears = useBearStore((state) => state.bears);
  const fish = useFoodStore((state) => state.fish);
  // const fish = useFoodStore.getState().fish; // non-reactive

  const add5Fish = () => {
    useFoodStore.setState((state) => ({
      fish: state.fish + 5,
    }));
  }; 

  // useEffect(()=>{
  //   if(fish > 6){
  //    setBgColor('salmon');
  //   } else{
  //    setBgColor('lavender');
  //   }
  //  },[fish])

   useEffect(()=>{
    const unsub = useFoodStore.subscribe(
      (state)=> state.fish,
      (fish)=>{
        if(fish > 6){
          setBgColor('salmon');
         } else{
          setBgColor('lavender');
         }
      },
      {
        equalityFn: shallow,
        fireImmediately: true, 
      }
      );
      return unsub;
   },[])
   
  return (
    <div className="box" style={{backgroundColor:bgColor}}>
      <h1>Food Box</h1>
      <p>fish: {fish}</p>
      <p>fish + bears = {fish + bears}</p>
      <div>
        <button onClick={addOneFish}>add one fish</button>
        <button onClick={removeOneFish}>remove one fish</button>
        <button onClick={removeAllFish}>remove all fish</button>

        <button onClick={add5Fish}>add 5 fish</button>
      </div>
    </div>
  );
};
