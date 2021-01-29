import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");
class MovieModal extends React.Component {

  render() {
    return (
      <modal>
        <Modal
          isOpen={this.props.isOpen}
          style={customStyles}
          contentLabel="Add film"
          onRequestClose={this.props.isClose}
        >
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
          <button onClick={this.props.isClose}>close Modal</button>
        </Modal>
      </modal>
    );
  }
}

export default MovieModal;
