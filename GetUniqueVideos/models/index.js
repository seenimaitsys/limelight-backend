import firebasedb from "../../db.js";
// import firebase from "firebase/compat/app";
function formatDate(date) {
  const formatDate = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
  return formatDate.toLocaleTimeString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZoneName: "short",
  });
}
import {
  getFirestore,
  collection,
  query,
  CollectionReference,
  where,
  getDoc,
  orderBy,
  doc,
  getCountFromServer,
  deleteDoc,
  limit,
  setDoc,
  getDocs,
  Timestamp,
  addDoc,
} from "firebase/firestore";

const firebase = getFirestore();
export const getUnwatchedVideo = async () => {
  // Get the current date and time
  // Calculate the time 2 hours ago from now
  const oneMinuteAgoTimestamp = Timestamp.fromMillis(
    Date.now() - 1 * 60 * 1000
  );

  const videoCollection = collection(firebase, "PendingReview");

  const collectionLength = await getCountFromServer(videoCollection);
  console.log(collectionLength.data().count);
  const videoQuery = query(
    videoCollection,

    where("watchedby", "<=", oneMinuteAgoTimestamp),
    orderBy("watchedby", "asc"), // Ensure this matches the index
    limit(1)
  );
  try {
    const videoSnapshot = await getDocs(videoQuery);
    if (videoSnapshot.empty) {
      const videoQuery = query(
        videoCollection,
        where("watchedby", "==", false),
        orderBy("createdDate"), // Ensure this matches the index
        limit(1)
      );
      const videoSnapshot = await getDocs(videoQuery);

      if (videoSnapshot.empty) return { message: "No  videos available!" };
      const videoDoc = videoSnapshot.docs[0];
      const videoData = videoDoc.data();

      try {
        await firebasedb.db
          .collection("PendingReview")
          .doc(videoDoc.id)
          .update({ watchedby: Timestamp.now() });
      } catch (error) {
        return { message: error.message };
      }

      const { createdDate: created, ...rest } = videoData;
      return {
        ...rest,
        createdDate: formatDate(videoData.createdDate),
        TotalVidos: collectionLength.data().count,
        alreadySomeOneWatch: false,
      };
    } else {
      const videoDoc = videoSnapshot.docs[0];
      const videoData = videoDoc.data();

      try {
        await firebasedb.db
          .collection("PendingReview")
          .doc(videoDoc.id)
          .update({ watchedby: Timestamp.now() });
      } catch (error) {
        return { message: error.message };
      }

      const { createdDate: created, ...rest } = videoData;
      return {
        ...rest,
        createdDate: formatDate(videoData.createdDate),
        TotalVidos: collectionLength.data().count,
        alreadySomeOneWatch: true,
      };
    }
  } catch (error) {
    return { message: error.message };
  }
};
export const findVideoAleardyUpdate = async (videoId) => {
  const docRef = doc(firebase, "PendingReview", videoId);

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return true; // Document does not exist, video not yet updated
    } else {
      return false; // Document exists, video already updated
    }
  } catch (error) {
    console.error("Error checking document existence:", error);
    return { message: error.message }; // Return error object if there's an issue
  }
};

export const doVideoReviewed = async ({
  reviewerEmail,
  videoinfo,
  reviewStatus,
}) => {
  ///unupload this field
  const {
    alreadySomeOneWatch: pass,
    success: success,
    loading: loading,
    TotalVidos: TotalVidos,
    watchedby: watchedby,
    ...rest
  } = videoinfo;

  if (reviewStatus == true) {
    const videoDocRef = doc(firebase, "ReviewedVideos", videoinfo.id);
    try {
      const reviewedVideo = {
        ...rest,
        id: videoinfo.id,

        createdDate: videoinfo.createdDate,
        reviewedBy: reviewerEmail,
        reviewedDate: Timestamp.now(),
      };
      await setDoc(videoDocRef, reviewedVideo);
      const deleteStatus = await deleteVideo(videoinfo.id);
      const ofterReviewedObject = {
        ...reviewedVideo,
        ReviewStatus: reviewStatus,
        TotalVidos: videoinfo.TotalVidos - 1,
      };
      return deleteStatus ? ofterReviewedObject : false;
    } catch (error) {
      return error.message;
    }
  } else {
    const videoDocRef = doc(firebase, "RejectVideos", videoinfo.id);

    try {
      const reviewedVideo = {
        ...rest,
        id: videoinfo.id,

        createdDate: videoinfo.createdDate,
        reviewedBy: reviewerEmail,
        DeclineReason: reviewStatus,
        reviewedDate: Timestamp.now(),
      };
      await setDoc(videoDocRef, reviewedVideo);
      const deleteStatus = await deleteVideo(videoinfo.id);
      const ofterReviewedObject = {
        ...reviewedVideo,
        ReviewStatus: reviewStatus,
        TotalVidos: videoinfo.TotalVidos - 1,
      };
      return deleteStatus ? ofterReviewedObject : false;
    } catch (error) {
      return error.message;
    }
  }
};

const deleteVideo = async (id) => {
  try {
    const deleteVideoDocRef = doc(firebase, "PendingReview", id);
    await deleteDoc(deleteVideoDocRef);
    return true;
  } catch (error) {
    return error.message;
  }
};
