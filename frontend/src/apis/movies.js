import React from "react";
import MovieModal from "../modals/movieModal";
class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      movies: [],
      isModalOpen: false,
      test: true,
    };
  }

  componentDidMount = () => {
    fetch("/movies")
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
  };

  handleAdd = () => {
    this.setState({ isModalOpen: true });
  };

  handleClose = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { error, isLoaded, movies } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="page-load">Loading...</div>;
    } else {
      return (
        <div><br />
          <button
            type="button"
            onClick={this.handleAdd}
            className="btn btn-outline-success btn-block"
          >
            New Film
          </button>
          <MovieModal
            isOpen={this.state.isModalOpen}
            isClose={this.handleClose}
          />
          <center>
            <div>
              <ul d-flex justify-content-center>
                {movies.map((item) => (
                  <a
                    href={`/movies/${item._id}`}
                    className="card d-flex p-2"
                    style={{
                      width: "75%",
                      marginTop: "5%",
                      overflow: "hidden",
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    <img
                      className="card-img-top"
                      src={`https://img.youtube.com/vi/${item.filmUrl.slice(
                        -11
                      )}/0.jpg`}
                      alt="card top"
                      style={{ marginTop: "-14%", marginBottom: "-10%" }}
                    />
                    <div
                      className="card-body"
                      style={{
                        backgroundColor: "#B1F5E9",
                        minHeight: "100px",
                        maxHeight: "200px",
                      }}
                    >
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">{item.description}</p>
                    </div>
                  </a>
                ))}
              </ul>
            </div>
          </center>
        </div>
      );
    }
  }
}

export default Movies;
