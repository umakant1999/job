import React from 'react';
import { useStore } from '../store/store';

const Synth = () => {
  const { count, increment, decrement } = useStore();
  

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
};

export default Synth;
