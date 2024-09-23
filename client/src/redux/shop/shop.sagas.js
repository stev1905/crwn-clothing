import { takeLatest, call, put, all } from 'redux-saga/effects';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';
import ShopActionTypes from './shop.types';
import { collection, getDocs } from 'firebase/firestore'; // Import necessary Firestore functions

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = collection(firestore, 'collections'); // Corrected access to collection
        const snapshot = yield getDocs(collectionRef); // Fetch the collection documents
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot); // Convert snapshot to map
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync
    );
}

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)]);
}