export const deleteTrack = id => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firestore
    .collection("trackOrder")
    .doc("IjsAb6HMd19dpmqhs3Eo")
    .get()
    .then(doc => {
      firestore
        .collection("trackOrder")
        .doc("IjsAb6HMd19dpmqhs3Eo")
        .update({
          order: [...doc.data().order.filter(trackId => trackId !== id)]
        })
        .then(() => {
          firestore
            .collection("tracklist")
            .doc(id)
            .delete();
        });
    });
};
