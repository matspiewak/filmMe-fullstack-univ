import React from "react";

import MovieModal from '../modals/movieModal';
class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      movies: [],
      isModalOpen: false,
    };
  }

  componentDidMount = async () => {
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
    this.setState({isModalOpen: true});
  }

  render() {

    const { error, isLoaded, movies } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="page-load">Loading...</div>;
    } else {
      return (
        <div>
          <ul>
            {movies.map((item) => (
              <li key={item._id}>
                {item.title} {item.author}
              </li>
            ))}
          </ul>
          <button type="button" onClick={this.handleAdd} className="btn btn-primary">Modal</button>
          <MovieModal isOpen={this.state.isModalOpen} />
        </div>
      );
    }
  }
}

export default Movies;
