import React from "react";
import Modal from "react-modal";

import { editFilmService } from "../services/FilmService";

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

    this.state = {
      title: this.props.title,
      filmUrl: this.props.filmUrl,
      author: this.props.author,
      category: this.props.category,
      description: this.props.description,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((state) => {
      state[name] = value;
      console.log(state);
      return state;
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, filmUrl, author, category, description } = this.state;

    if (!(title && filmUrl && author && category && description)) {
      this.setState({ error: "Fields are required" });
      return;
    }

    editFilmService
      .editFilm(title, filmUrl, author, category, description)
      .then((error) => this.setState({ error }));
  };

  render() {
    const { title, filmUrl, author, category, description, error } = this.state;
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          contentLabel="Add film"
          onRequestClose={this.props.isClose}
          style={customStyles}
        >
          <h4>Edit movie</h4>
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col">
                <label htmlFor="title">title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="title"
                  name="title"
                  onChange={this.handleChange}
                  value={title}
                ></input>
              </div>
              <div className="col">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="eg. Tim Walles"
                  name="author"
                  onChange={this.handleChange}
                  value={author}
                ></input>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="filmUrl">Film url address (youtube)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="eg. https://youtu.be/UgNqzbcr2Pw"
                  name="filmUrl"
                  onChange={this.handleChange}
                  value={filmUrl}
                ></input>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="eg. Horror"
                  name="category"
                  onChange={this.handleChange}
                  value={category}
                ></input>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="film description"
                  name="description"
                  onChange={this.handleChange}
                  value={description}
                ></input>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col">
                <button className="btn btn-outline-dark" type="submit">
                  send
                </button>
              </div>
              <div className="col">
                <button
                  type="button"
                  className="btn btn-outline-warning"
                  onClick={this.props.isClose}
                >
                  close
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={this.props.handleDelete}
                >
                  Delete
                </button>
                <editFilmService id={this.props.id}/>
              </div>
            </div>
            {error && <div className={"alert alert-danger"}>{error}</div>}
          </form>
        </Modal>
      </div>
    );
  }
}

export default MovieModal;
