import { useEffect } from "react";
import { useBearStore } from "../stores/bearStore";
import { shallow } from "zustand/shallow";

export const BearBox = () => {
  const bears = useBearStore((state) => state.bears);
  const color = useBearStore((state) => state.color);
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  const ColorTransformation = useBearStore((state) => state.ColorTransformation);
  const ColorTransformationOther = useBearStore((state) => state.ColorTransformationOther);
  const removeAllBears = useBearStore((state) => state.removeAllBears);

  //两种调用方法
  // const {
  //   bears,
  //   color
  //   increasePopulation,
  //   removeAllBears
  // } = useBearStore((state) => ({
  //   bears:state.bears,
  //   color:state.color,
  //   increasePopulation:state.increasePopulation,
  //   removeAllBears:state.removeAllBears
  // }));  


  useEffect(() => {
    const unsub = useBearStore.subscribe(
      (state) => state.bears,
      (bears) => {
        if (bears > 2) { 
          ColorTransformationOther();
        } else {
          ColorTransformation();
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
    <div className="box" style={{ backgroundColor: color }}>
      <h1>Bear Box</h1>
      <p>bears: {bears}</p>
      <p>{Math.random()}</p>
      <div>
        <button onClick={increasePopulation}>add bear</button>
        <button onClick={removeAllBears}>remove all bears</button>
        <button onClick={useBearStore.persist.clearStorage}>
          clear storage
        </button>
      </div>
    </div>
  );
};
