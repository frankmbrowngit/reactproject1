import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import rentals from './rentals';
import rental from './rental';
import thunk from 'redux-thunk';
import auth from './auth';
const addPromiseToDispatch = (store) => {
    const { dispatch } = store;
    return action =>  {
        if (action.then && typeof action.then === 'function') {
            return action.then(dispatch)
        }
        dispatch(action);
    }
}
export function initStore() {
    const reducers = combineReducers({
        rentals,
        rental,
        auth
    });
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducers,composeEnhancers(applyMiddleware(thunk)));

    store.dispatch = addPromiseToDispatch(store);
    
    return store;
}

