import React from "react";
import { changeOrder } from "../store/actions";
import Track from "./Track";
import { connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddTrack from "./AddTrack";
import "../sass/TrackList.scss";

const mapDispatchToProps = dispatch => ({
  changeOrder: newOrder => dispatch(changeOrder(newOrder))
});

const TrackList = ({
  trackList,
  tracksOrder,
  changeOrder,
  onStop,
  onChangeTrackOnDelete
}) => {
  const onDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) {
      return;
    }
    if (destination.index === source.index) {
      return;
    } else {
      const newTracksOrder = Array.from(tracksOrder);
      newTracksOrder.splice(source.index, 1);
      newTracksOrder.splice(destination.index, 0, draggableId);
      changeOrder(newTracksOrder);
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tracklist">
        {provided => (
          <div
            className="tracklist"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tracksOrder.map((id, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided, snapshot) => {
                  const selectedTrack = trackList.find(
                    track => track.firebaseId === id
                  );
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {selectedTrack && (
                        <Track
                          track={selectedTrack}
                          isDragging={snapshot.isDragging}
                          onStop={onStop}
                          onChangeTrackOnDelete={onChangeTrackOnDelete}
                        />
                      )}
                    </div>
                  );
                }}
              </Draggable>
            ))}
            {provided.placeholder}
            <AddTrack />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(TrackList);
