import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';

const config = {
  apiKey: "AIzaSyAfX5K_G39bWng6XU3xo6lrEFUABKUCggM",
  authDomain: "crown-db-9ac4f.firebaseapp.com",
  databaseURL: "https://crown-db-9ac4f.firebaseio.com",
  projectId: "crown-db-9ac4f",
  storageBucket: "crown-db-9ac4f.appspot.com",
  messagingSenderId: "310583240794",
  appId: "1:310583240794:web:7b48b57f0c7cfc41ce5063",
  measurementId: "G-1XJ8YDHX4C"
};

// Initialize Firebase
const firebaseApp = initializeApp(config);

// Initialize services
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

// User profile document creation
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(firestore, `users/${userAuth.uid}`);
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

// Add collections and documents
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(firestore, collectionKey);
  const batchRef = writeBatch(firestore); // Create a write batch

  objectsToAdd.forEach(obj => {
    const newDocRef = doc(collectionRef); // Create a new doc reference
    batchRef.set(newDocRef, obj); // Set the doc with the object
  });

  return await batchRef.commit(); // Commit the batch
};

// Convert collections snapshot to map
export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

// Get current user
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

// Google sign-in
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

// Export the services
export { auth, firestore };
