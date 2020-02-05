import React from 'react';
import Spinner from '../spinner/spinner.component';

const WithSpinner = (WrappedComponent) => ({ isLoading,...otherProp }) => {
    return isLoading ? <Spinner /> : <WrappedComponent {...otherProp} />
}

export default WithSpinner;