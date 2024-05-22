import firebasedb from "../../db.js";
import bcrypt from "bcryptjs";

export async function checkLoginCredentials({ email, password }) {
  try {
    // const querySnapshot = await firebasedb.db
    //   .collection("reviewer")
    //   .where("email", "==", email)
    //   .get();
    const usersRef = firebasedb.db.collection("reviewer");
    const snapshot = await usersRef.where("email", "==", email).get();
    if (snapshot.empty) {
      return { message: "No user found with this email." };
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    const isPasswordCorrect = await bcrypt.compare(password, userData.password);

    if (!isPasswordCorrect) {
      return { message: "Incorrect email or password" };
    }

    return { currentlogin: userData, id: userDoc.id };
  } catch (error) {
    return { message: error.message };
  }
}
