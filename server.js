const express = require('express');
const server = express();
const path = require('path');
const authRoutes = require("./routes/authRoutes")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")

// middleware
server.use(express.static('public'));
server.use(express.json());
server.use(cookieParser())

// view engine
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, '/views'));

server.listen(80);
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


async function update(snapshot) {

}

const createToken = (id, maxAge) => {
  return jwt.sign({ id }, 'n0!Ds[Lfs*2Bs!TsSd', {
      expiresIn: 12*60*60
  })
}

server.post('/login', (req, res) => {
  const {parcel} = req.body;
  console.log(parcel);
  
          if (!parcel) {
              return res.status(400).send({status:"failed"})
          }

          // jwtest = createToken(parcel)

          
          db.collection("adminCol").where("username", "==", parcel.username).get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  const userDetails = doc.data()
                  let userLoggedIn = true

                  console.log(userDetails);

                  console.log("parcel pass: "+parcel.password);

                      if (parcel.password == userDetails.password) {
                      const jwt = createToken(userDetails.username);
                      // res.cookie("jwt", jwt, {httpOnly: true, maxAge: 12*60*60 * 1000})
                      res.cookie("jwt", jwt, {httpOnly: true})
                      res.status(200).send({
                          status: "recieved", userLoggedIn
                      })
                      }
                      else {
                      res.status(400).send({
                          status: "recieved", message: "Wrong user details. "
                      })
                      }

              });
          })
          .catch((error) => {
              console.log("Error getting documents: ", error);
              res.status(400).send({
                status: "recieved", message: "Error getting documents. "
            })
          });

          console.log(parcel);

})

let tempRef = db.collection("shoes")

let now = new Date()
let rMathers = Math.floor(100000 + Math.random() * 900000)

// let yeas = {
//   "articlenumber": rMathers,
//   "brand": "Adidas",
//   "date": now,
//   "model": "1",
//   "name": "Adidas Tagilla Sneakers",
//   "price": "1275"
// }

    // tempRef.add(yeas)

    server.get('/getLatest', (req, res) => {
      let testArray = []

              db.collection("shoes").orderBy("date", "desc").limit(10).get().then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                      // doc.data() is never undefined for query doc snapshots
                      const userDetails = doc.data()
                    testArray.push(userDetails)
                  });
              })
              .then(() => {
                res.status(400).send({
                  status: "recieved", releases: testArray
              })
              })
              .catch((error) => {
                  console.log("Error getting documents: ", error);
                  res.status(400).send({
                    status: "recieved", message: "Error getting documents. "
                })
              });
    
    })

    server.get('/getAll', (req, res) => {
      let testArray = []

              db.collection("shoes").orderBy("date", "desc").get().then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                      // doc.data() is never undefined for query doc snapshots
                      const userDetails = doc.data()
                    testArray.push(userDetails)
                  });
              })
              .then(() => {
                res.status(400).send({
                  status: "recieved", releases: testArray
              })
              })
              .catch((error) => {
                  console.log("Error getting documents: ", error);
                  res.status(400).send({
                    status: "recieved", message: "Error getting documents. "
                })
              });
    
    })

server.post('/addShoes', async (req, res) => {
    const {parcel} = req.body;

    let shoe = parcel.shoe
    let date = new Date()

    let item = {
      name: shoe.name,
      brand: shoe.brand,
      model: shoe.model,
      price: shoe.price,
      article: shoe.article,
      date
  }

    let userRef = db.collection("shoes")



    console.log(item);

    userRef.add(item)

  //   res.status(400).send({
  //     status: "recieved", message: "Adding document! "
  // })

    // const snapshot = await userRef.where('first', '==', parcel.first).get();
            // console.log(jwtest);

})

// page not found
server.use((req, res) => res.status(404).render('404'));
