import { findVideoAleardyUpdate } from "../models/index.js";
export const checkVideoAleardyUpdate = async (videoId) => {
  const result = await findVideoAleardyUpdate(videoId);
  // return true;
  if (result) {
    return true;
  } else {
    return false;
  }
};
