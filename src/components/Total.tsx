import { useState } from "react";
import { useBearStore } from "../stores/bearStore";
import { useCatStore } from "../stores/catStore";
import { useFoodStore } from "../stores/foodStore";
import { useTotalStore } from "../stores/total";

export const TotalBox = () => {
    const bears = useBearStore((state) => state.bears);
    const bigCats = useCatStore((state) => state.cats.bigCats);
    const smallCats = useCatStore((state) => state.cats.smallCats);
    const fish = useFoodStore((state) => state.fish);
    const [bgColor] = useState<string>(useTotalStore((state) => state.color));

      return (
        <div className="box" style={{backgroundColor:bgColor}}>
          <h1>Total Box</h1>
          <p>{Math.random()}</p>
          <p>Total: {bears+bigCats+smallCats+fish}</p>
          <div>
          </div>
        </div>
      );
};
