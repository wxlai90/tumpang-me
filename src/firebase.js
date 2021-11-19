import { initializeApp } from "firebase/app";

import {
  getFirestore,
  doc,
  onSnapshot,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwFR2JNh9n8igDVChkY0Mg67YQ0mTQF_Y",
  authDomain: "tumpang-me.firebaseapp.com",
  projectId: "tumpang-me",
  storageBucket: "tumpang-me.appspot.com",
  messagingSenderId: "429307340833",
  appId: "1:429307340833:web:ad358f7b769af49f631b60",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const tumpangs = collection(db, "tumpangs");

export const getAllTumpangs = async () => {
  const tumpangsSnapshot = await getDocs(tumpangs);
  const tumpangsList = tumpangsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return tumpangsList;
};

export const addTumpang = async (tumpang) => {
  return addDoc(tumpangs, { ...tumpang, createdAt: serverTimestamp() });
};

export const addChatMessageToTumpang = async (tumpangId, messagePayload) => {
  const messagesCol = collection(db, "tumpangs", tumpangId, "messages");

  return addDoc(messagesCol, {
    ...messagePayload,
    createdAt: serverTimestamp(),
  });
};

export const doSomething = (tumpangId, callbackFn) => {
  onSnapshot(
    collection(db, "tumpangs", tumpangId, "messages"),
    (collection) => {
      const messages = collection.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      callbackFn(messages);
    }
  );
};
