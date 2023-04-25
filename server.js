const express = require('express');
const path = require('path');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.listen(80);
console.log('Connected!');

// page routes
server.use(authRoutes)

const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

var admin = require("firebase-admin");

// Fetch the service account key JSON file contents
var serviceAccount = require("./the.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // The database URL depends on the location of the database
  databaseURL: "https://europe-west.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
const db = getFirestore();

// db.collection("test").get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         const data = doc.data()
//         console.log(data);
//     })
// })

async function test() {

let docRef = db.collection("test").doc("1");
let oldCred = await docRef.get()

console.log(oldCred.data().name);

}

test()

async function update(snapshot) {

}

app.post('/createReadUpdate', async (req, res) => {
    const {parcel} = req.body;
    console.log(parcel);
    console.log(parcel.first);
    console.log(parcel.last);

    let userRef = db.collection("test")

    const snapshot = await userRef.where('first', '==', parcel.first).get();

    if (snapshot.empty) {
        console.log('No matching documents. Adding user to database!');
        userRef.add(parcel)

        res.status(200).send({
            status: "recieved",
            message: `Person "${parcel.first+" "+parcel.last}" has been added!`
        })
        return;
      }  
      
    else {
        console.log('Person with first name already exists, updating last name!');
        for (doc of snapshot.docs) {
        let docRef = db.collection("test").doc(doc.id);
        let oldCred = await docRef.get()
        let oldCredData = oldCred.data()
        console.log(oldCredData);
        docRef.update({last: parcel.last})

        res.status(200).send({
            status: "recieved",
            message: `Person "${oldCred.data().first+" "+oldCred.data().last}" has been updated to "${parcel.first+" "+parcel.last}"!`
        })

      };
    }
            // console.log(jwtest);

})

// page not found
app.use((req, res) => res.status(404).render('404'));
