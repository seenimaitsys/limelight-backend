import { getUnwatchedVideo, doVideoReviewed } from "../models/index.js";
import { checkVideoAleardyUpdate } from "../middlewares/index.js";
export const getUniqeVideo = async (req, res) => {
  const result = await getUnwatchedVideo();
  if (result) {
    const { ...rest } = result;
    // console.table(result.videInfo.createdDate);
    const videoObject = {
      ...rest,
      TotalVidos: result.TotalVidos,
      alreadySomeOneWatch: result.alreadySomeOneWatch,
    };

    res.status(200).json(videoObject);
  } else {
    res.status(200).send({
      message: result.message,
      success: false,
      loading: false,
    });
  }
};

export const updateVideoReviewed = async (req, res) => {
  const { videoinfo, reviewerEmail, reviewStatus } = req.body;
  if (videoinfo.alreadySomeOneWatch == true) {
    // alreadySomeOneWatch the check one contition
    const result = await checkVideoAleardyUpdate(videoinfo.id);
    if (result) {
      const reviewedresult = await doVideoReviewed({
        reviewerEmail,
        videoinfo,
        reviewStatus,
      });
      reviewedresult != false
        ? res.status(200).send({ ...reviewedresult })
        : res.status(200).send({
            message: "Video update error",
            success: false,
            loading: false,
          });
    } else {
      res.status(200).send({
        ...videoinfo,
        alreadyUpdate: true,
        message: "Aleardy Someone Updated this video!",
        success: false,
        loading: false,
      });
    }
  } else {
    const reviewedresult = await doVideoReviewed({
      reviewerEmail,
      videoinfo,
      reviewStatus,
    });
    reviewedresult
      ? res.status(200).send({ ...reviewedresult })
      : res.status(200).send({
          message: "Video update error",
          success: false,
          loading: false,
        });
  }
};
