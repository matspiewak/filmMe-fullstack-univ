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
  constructor(props) {
    super(props);

  }
  render() {

    return (
      <modal>
        <Modal
          isOpen={this.props.isOpen}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      </modal>
    );
  }
}

export default MovieModal;
