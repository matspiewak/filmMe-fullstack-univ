let addFilm = (title, filmUrl, author, category, description) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      filmUrl,
      author,
      category,
      description,
    }),
  };

  return fetch("/movies/create", requestOptions)
    .then(handleResponse)
    .then((movie) => {
      return movie;
    });
};

let editFilm = (title, filmUrl, author, category, description) => {
  const requestOptions = {
    method: "Patch",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      filmUrl,
      author,
      category,
      description,
    }),
  };
  const {id} = this.props.id
  return fetch(`/movies/${id}`, requestOptions)
    .then(handleResponse)
    .then((movie) => {
      return movie;
    });
};

let handleResponse = (response) => {
  return response.text((text) => {
    const data = text && JSON.parse(text);
    return data;
  });
};

export const addFilmService = {
  addFilm,
};

export const editFilmService = {
  editFilm,
};
