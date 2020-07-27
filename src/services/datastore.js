/* eslint-disable import/prefer-default-export */
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyC9UgVQX-3n3Mqb3jfNErGiMqPnJCzv1Vg',
  authDomain: 'firenotes-738bd.firebaseapp.com',
  databaseURL: 'https://firenotes-738bd.firebaseio.com',
  projectId: 'firenotes-738bd',
  storageBucket: 'firenotes-738bd.appspot.com',
  messagingSenderId: '623094554',
  appId: '1:623094554:web:6bb6cef918795b015c5aa3',
  measurementId: 'G-PXZCD683S5',
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export function fetchNotes(callback) {
  database.ref('notes').on('value', (snapshot) => {
    callback(snapshot.val());
  });
}

export function deleteNote(id) {
  database.ref('notes').child(id).remove();
}

export function updateNote(id, changeType, change) {
  if (changeType === 'title') {
    database.ref('notes').child(id).update({ title: change });
  } else if (changeType === 'text') {
    database.ref('notes').child(id).update({ text: change });
  } else if (changeType === 'position') {
    database.ref('notes').child(id).update({ x: change[0], y: change[1] });
  }
}

export function addNote(title) {
  const newNote = {
    title,
    text: '',
    x: 400,
    y: 12,
    zIndex: 26,
  };
  database.ref('notes').push(newNote);
}
