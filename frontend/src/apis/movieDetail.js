import React from "react";
import { useParams } from "react-router-dom";
import MovieModal from "../modals/movieModal";

class MovieDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      movies: [],
      reviews: [],
      isModalOpen: false,
    };
    console.log(this.props.match.params.id);
  }

  componentDidMount = () => {
    fetch(`/movies/${this.props.match.params.id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            movies: result.info,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
    fetch("/reviews")
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          reviews: result.info,
        });
      });
  };

  handleAdd = () => {
    this.setState({ isModalOpen: true });
  };

  handleClose = () => {
    this.setState({ isModalOpen: false });
  };
  render() {
    const { movies, reviews } = this.state;

    let url = movies.filmUrl;
    console.log(url);
    return (
      <center>
        <div>
          <button
            type="button"
            onClick={this.handleAdd}
            className="btn btn-primary"
          >
            Modal
          </button>
          <MovieModal
            isOpen={this.state.isModalOpen}
            isClose={this.handleClose}
          />
          <ul d-flex justify-content-center>
            {reviews.map((item) => (
              <div>
                <li>{item.title}</li>
                <li>{item.content}</li>
              </div>
            ))}
          </ul>
        </div>
      </center>
    );
  }
}

export default MovieDetail;
