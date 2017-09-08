import Firebase from 'firebase'
import config from '../config/firebase.json'

let initConfig = {
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  databaseURL: config.firebase.databaseURL,
  projectId: config.firebase.projectId,
  storageBucket: config.firebase.storageBucket,
  messagingSenderId: config.firebase.messagingSenderId
}

let app = Firebase.initializeApp(initConfig)
let db = app.database()

export function getDataReportList () {
  return db.ref('dataReport').once('value')
}

export function getBillDataKey () {
  var ref = db.ref('dataReport').push()
  var key = ref.key
  return { ref: ref, key: key }
}

// should first get key & ref from getBillDataKey
export function postBillData (ref, reqObj) {
  return ref.set(reqObj)
}
