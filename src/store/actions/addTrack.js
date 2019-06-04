import { THROW_ERROR } from "../constants";
import Duration from "duration-js";
export const addTrack = id => (dispatch, getState, { getFirestore }) => {
  // FETCHING YOUTUBE VIDEO BY VIDEO ID
  const key = "AIzaSyDiqIFAzhVafKGtxUoWAwOOSfyqbSrSQWI";
  return fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&id=${id}&key=${key}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    }
  )
    .then(res => res.json())
    .then(data => {
      let img;
      const thumbnails = data.items[0].snippet.thumbnails;
      if (thumbnails.standard) {
        img = thumbnails.standard.url;
      } else if (thumbnails.high) {
        img = thumbnails.high.url;
      } else if (thumbnails.medium) {
        img = thumbnails.medium.url;
      } else {
        img = thumbnails.default.url;
      }
      const newTrack = {
        title: data.items[0].snippet.title,
        id: data.items[0].id,
        time: 0,
        duration: new Duration(
          data.items[0].contentDetails.duration.slice(2).toLocaleLowerCase()
        ).seconds(),
        img: img,
        active: false
      };
      // ADDING VIDEO TO FIRESTORE DATABASE
      const firestore = getFirestore();
      // ADDING TRACK TO TRACKLIST
      firestore
        .collection("tracklist")
        .add(newTrack)
        .then(res => {
          // GETTING TRACKORDER ARRAY AND THEN ADDING NEW ID TO ARRAY
          firestore
            .collection("trackOrder")
            .doc("IjsAb6HMd19dpmqhs3Eo")
            .get()
            .then(doc => {
              firestore
                .collection("trackOrder")
                .doc("IjsAb6HMd19dpmqhs3Eo")
                .update({
                  order: [...doc.data().order, res.id]
                });
            });
        });
    })
    .catch(err => {
      dispatch({
        type: THROW_ERROR,
        message: "Oops! Something went wrong. Try again!"
      });
    });
};
