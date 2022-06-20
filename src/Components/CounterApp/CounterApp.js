import React, { useEffect, useCallback } from "react";
import "./CounterApp.css";
import { useState } from "react";
import PropTypes from 'prop-types'
import CounterView from "./CounterView.js";
// Set is object that keeps only unique data
const functions = new Set();
const CounterApp = (props) => {
    const [count,changeCount] = useState(0);
    const [whatever, setWhatever] = useState(10);

    useEffect(() => {
        console.log("Use Effect");
    },[]);
    const increment = useCallback((step) => () => changeCount(count + step),[count]);
    const doWhatever = useCallback( () => setWhatever(whatever+1),[whatever])
    const { title } = props;
    functions.add(increment);
    functions.add(doWhatever);
  return (
    <div className = "counter-app">
        <h1>{title}</h1>
      <CounterView countValue = {count} handleIncrement = {increment}/>
      <button onClick={doWhatever}>Do Whatever</button>
      <br />
      <h1>Functions:{functions.size}</h1>
    </div>
  );
};

// class CounterApp extends React.Component {
//     constructor() {
//         super();
//         // this.increment = this.increment.bind(this);
//         // this.decrement = this.decrement.bind(this);
//         this.state = {
//             count: 0,
//         };
//     }
    
//     componentDidMount( ) {
//         // debugger;
//         // alert('Component Did Mount Called');
//     }
//     componentDidUpdate() {
//         // Don't change state in componentDidUpdate()
//         // debugger;
//         // alert('Component Did Update Called');
//     }
//     increment(step) {
//         this.setState( {
//             count: this.state.count + step
//         })
//     }
//     // Lifecycle function
//     render() {
//         // debugger;
//         // alert("Render Called");
//         const { count } = this.state;
//         return (
//             <div className="counter-app">
//                  <h1>{this.props.title}</h1>
//                 <CounterView start = {0} />
//             </div>
//         );
//     }
// }
CounterApp.propTypes = {
    title: PropTypes.string.isRequired
}
export default CounterApp;

// Class components are usually bigger components, need more state handlers
// Bigger Components => Class Components, Smaller Components => Functional Components