import React, { useState, useEffect } from "react";
import "./CounterApp.css";
const generateColor = () => {
    return '#' + (Math.random() * 0xFFFFFF<<0).toString(16);
}
// Component only gets rerendered when props are chnaged
const CounterView = React.memo((props) => {
    
    const { countValue, handleIncrement} = props;
    useEffect(() => {
        console.log("Use Effect from Counter View");

    },[countValue]);
    
    return (
        <div style = {{background: generateColor()}}>
            <h1 className="value">{countValue}</h1>
            <button onClick={handleIncrement(4)}>Increment</button>
            <button onClick={handleIncrement(-2)}>Decrement</button>
            
        </div>
    );
});
export default CounterView;
