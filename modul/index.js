// const Product = {
//   create: async (id, name, price, retailer, amountInStock) => {
//     // Implement your logic to create a product in Firebase
//   },

//   getAll: async () => {
//     // Implement your logic to fetch all products from Firebase
//   },

//   getById: async (productId) => {
//     // Implement your logic to fetch a product by its ID from Firebase
//   },

//   update: async (id, name, price, retailer, amountInStock) => {
//     // Implement your logic to update a product in Firebase
//   },

//   delete: async (productId) => {
//     // Implement your logic to delete a product from Firebase
//   },
// };

// export default Product;
// import Product from "./Product";

// // Usage example
// async function someFunction() {
//   // Create a product
//   await Product.create("productId", "productName", 100, "retailerName", 10);

//   // Fetch all products
//   const allProducts = await Product.getAll();
//   console.log(allProducts);

//   // Fetch a product by ID
//   const productById = await Product.getById("productId");
//   console.log(productById);

//   // Update a product
//   await Product.update(
//     "productId",
//     "newProductName",
//     150,
//     "newRetailerName",
//     20
//   );

//   // Delete a product
//   await Product.delete("productId");
// }
// //////logic
// import firebase from 'firebase/app';
// import 'firebase/firestore';

// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: 'YOUR_API_KEY',
//   authDomain: 'YOUR_AUTH_DOMAIN',
//   projectId: 'YOUR_PROJECT_ID',
//   storageBucket: 'YOUR_STORAGE_BUCKET',
//   messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//   appId: 'YOUR_APP_ID'
// };

// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();

// const Product = {
//   create: async (id, name, price, retailer, amountInStock) => {
//     try {
//       await db.collection('products').doc(id).set({
//         id,
//         name,
//         price,
//         retailer,
//         amountInStock
//       });
//       return true;
//     } catch (error) {
//       console.error('Error creating product:', error);
//       return false;
//     }
//   },

//   getAll: async () => {
//     try {
//       const snapshot = await db.collection('products').get();
//       return snapshot.docs.map(doc => doc.data());
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       return [];
//     }
//   },

//   getById: async (productId) => {
//     try {
//       const doc = await db.collection('products').doc(productId).get();
//       if (doc.exists) {
//         return doc.data();
//       } else {
//         console.log('No such document!');
//         return null;
//       }
//     } catch (error) {
//       console.error('Error getting product by ID:', error);
//       return null;
//     }
//   },

//   update: async (id, name, price, retailer, amountInStock) => {
//     try {
//       await db.collection('products').doc(id).update({
//         name,
//         price,
//         retailer,
//         amountInStock
//       });
//       return true;
//     } catch (error) {
//       console.error('Error updating product:', error);
//       return false;
//     }
//   },

//   delete: async (productId) => {
//     try {
//       await db.collection('products').doc(productId).delete();
//       return true;
//     } catch (error) {
//       console.error('Error deleting product:', error);
//       return false;
//     }
//   }
// };

// export default Product;
