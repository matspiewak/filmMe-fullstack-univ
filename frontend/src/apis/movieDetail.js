import React from "react";
import MovieEditModal from "../modals/movieEditModal";

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
    return (
        <div>
          <button
            type="button"
            onClick={this.handleAdd}
            className="btn btn-primary"
          >
            Edytuj film
          </button>
          <MovieEditModal
            isOpen={this.state.isModalOpen}
            isClose={this.handleClose}
            id={movies._id}
            title={movies.title}
            filmUrl={movies.filmUrl}
            author={movies.author}
            category={movies.category}
            description={movies.description}
          />
          <ul d-flex justify-content-center>
          <label class="col-sm-2 col-form-label">
                          Komentarze
                        </label>
            {reviews.map((item) => (
              <div>
                <form>
                  <fieldset disabled>
                    <div className="form-group">
                      <div className="col-sm-4">
                        
                        <input
                          type="text"
                          readonly
                          className="form-control"
                          value={item.title}
                        />
                      </div>
                      <div className="col-sm-4">
                        <textarea
                          type="text"
                          readonly
                          className="form-control"
                          value={item.content}
                          style={{ height: "100px" }}
                        />
                      </div>
                    </div>
                    <br />
                  </fieldset>
                </form>
              </div>
            ))}
          </ul>
        </div>
    );
  }
}

export default MovieDetail;
