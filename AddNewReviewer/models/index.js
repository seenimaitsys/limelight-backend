import firebasedb from "../../db.js";
import bcrypt from "bcryptjs";
import firebase from "firebase/compat/app";
const NewReviewer = {
  createNewReviewer: async ({ name, email, mobile, password }) => {
    // return password;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const addReviewer = {
        name,
        email,
        mobile,
        password: hashedPassword,
        allowAddNewReviewer: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      await firebasedb.db.collection("reviewer").add(addReviewer);
      // res.status(201).send({ id: userRef.id });
      return "firebase-add";
    } catch (error) {
      // res.status(400).send(error.message);
      return error.message;
    }
  },
  ///Check_already_excited
  findEmail_For_already_excited: async (email) => {
    // const { reviewerName, email, mobile, password } = data;
    try {
      const usersRef = firebasedb.db.collection("reviewer");
      const snapshot = await usersRef.where("email", "==", email).get();

      if (snapshot.empty) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return error.message;
    }
  },
  // Add update and delete methods as needed
};

export default NewReviewer;
