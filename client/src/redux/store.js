import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducers from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

// Create the store
export const store = createStore(rootReducers, applyMiddleware(...middlewares));

// Run the saga middleware
sagaMiddleware.run(rootSaga);

// Create the persistor
export const persistor = persistStore(store);

// Assign the store and persistor to a variable
const reduxStore = { store, persistor };

// Export the variable instead of an anonymous object
export default reduxStore;
