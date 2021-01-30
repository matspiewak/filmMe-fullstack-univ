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
      url: '',
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
            url: result.info.filmUrl
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
    const { movies, reviews,url } = this.state;
    
    console.log((url).slice(-11));
    return (
      <div>
        <br />
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
        <br />
        <div class="card">
          <div class="card-header">{movies.author}</div>
          <div class="card-body">
            <h5 class="card-title">{movies.title}</h5>
            <p class="card-text">{movies.description}</p>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${(url).slice(-11)}`}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen="true"
            ></iframe>
            <p class="card-text">{movies.createdAt}</p>
          </div>
        </div>
        <ul d-flex justify-content-center>
          <label class="col-sm-2 col-form-label">Komentarze</label>
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
