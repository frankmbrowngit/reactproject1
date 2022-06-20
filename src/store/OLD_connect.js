import React from 'react';
import { StateContext } from "./Provider.js";

const Connect = (selectState) => {
    return (Component) => {
        class Connect2 extends React.Component {
            constructor(props, context) {
                super(props);
                this.state = {
                    slice: selectState(context.getState())
                }
                this.unsubscribe = context.subscribe(() => this.handleStateChange(context));
            
            }
            
            handleStateChange = (context) => {
                const rootState = context.getState();
                this.setState({slice: selectState(rootState)})
            }
            componentWillUnmount() {
                this.unsubscribe();
            }
            render() {
                const { dispatch } = this.context;
                const { slice } = this.state;
                
                return <Component {...slice} dispatch = {dispatch}></Component>
            }
        }
        Connect2.contextType = StateContext;
        return Connect2;
    }
}
export default Connect;

