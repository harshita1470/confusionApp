import { config } from './config';
import * as firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp(config);

const settings = {timestampsInSnapshots: true};
firebase.firestore().settings(settings);

export const storage = firebase.storage();

export const firestore = firebase.firestore();

export const firebasestore = firebase.firestore;