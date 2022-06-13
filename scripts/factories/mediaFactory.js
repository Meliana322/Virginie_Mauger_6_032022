import { Image } from "../class/Image.js";
import { Video } from "../class/Video.js";

export function mediaFactory(mediaInfo, mediaList, photographerId) {
  let newMedia = {};

  if (mediaInfo.image !== undefined) {
    newMedia = new Image(
      mediaInfo.title,
      mediaInfo.likes,
      mediaInfo.image,
      mediaInfo.video,
      mediaInfo.date,
      photographerId,
      mediaList
    );
  } else {
    newMedia = new Video(
      mediaInfo.title,
      mediaInfo.likes,
      mediaInfo.image,
      mediaInfo.video,
      mediaInfo.date,
      photographerId,
      mediaList
    );
  }

  return newMedia;
}
