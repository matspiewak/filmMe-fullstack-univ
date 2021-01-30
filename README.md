# filmMe-fullstack-univ
 Full stack application for sharing and/or posting reviews of self made films

# Table of contents

* [Setup](#Setup)
* [Techonogies](#Technologies)
* [Features](#Features)
* [Screenshots](#Screenshots)
* [Code examples](#Code-examples)


## Setup

Both backend and fronted were made with Node.js, which is required to start this app. To start it, clone this repository then open it with preferrably in VS Code, go to backend folder and client folder and type following commands to install required modules, start server and client: 
```
$ npm install
$ npm start
```
Client app should open new browser windows. To work properly, client requires connection to server, which means it has to be running

## Technologies

* React.js
* MongoDB
* Node.js
* Bootstrap

* Frontend dependencies: 
```
    "@testing-library/jest-dom": "^5.11.9",
    "@testing-library/react": "^11.2.3",
    "@testing-library/user-event": "^12.6.0",
    "js-cookie": "^2.2.1",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-modal": "^3.12.1",
    "react-router-dom": "^5.2.0",
    "react-scripts": "4.0.1",
    "validator": "^13.5.2",
    "web-vitals": "^0.2.4"
```
* Backend dependencies: 
```
    "bcrypt": "^5.0.0",
    "body-parser": "^1.19.0",
    "cookie-parser": "^1.4.5",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.11.9",
    "morgan": "^1.10.0",
    "nodemon": "^2.0.6",
    "passport": "^0.4.1",
    "passport-jwt": "^4.0.0",
    "passport-local": "^1.0.0",
    "passport-twitter": "^1.0.4"
```
## Features

* Backend and frontend CRUD of movies
* Backend and frontend CR of revews
* Saving data on remote mongoDB database
* JWT Auth. with httpOnly cookie

## Screenshots

<img src="/media/img/movies.png" width="49%">&nbsp;<img src="/media/img/movieDetail.png" width="49%">
<img src="/media/img/newMovie.png" width="49%">&nbsp;<img src="/media/img/signedIn.png" width="49%">


## Code exanples

### Post new film
frontend:
```
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
```

backend:
```
router.post("/create",passport.authenticate('jwt', {session: false}), (req, res, next) => {
  const movie = new Movie({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    filmUrl: req.body.filmUrl,
    author: req.body.author,
    category: req.body.category,
    description: req.body.description,
    dateCreated: req.body.dateCreated,
  });
  movie
    .save()
    .then((doc) => {
      res.status(200).json({
        message: "Movie successfully added",
        info: doc,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});
```
modal:
```
<Modal
          isOpen={this.props.isOpen}
          contentLabel="Add film"
          onRequestClose={this.props.isClose}
          style={customStyles}
        >
          <h4>Add your movie</h4>
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
                  className="btn btn-outline-danger"
                  onClick={this.props.isClose}
                >
                  close
                </button>
              </div>
            </div>
            {error && <div className={"alert alert-danger"}>{error}</div>}
          </form>
        </Modal>
```

model BD:
```

const movieSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  filmUrl: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  }
});
```
## Status

Finished - no more updates

## Contact

In case of questions - feel free to ask me, <a href="https://github.com/matspiewak/">@matspiewak</a>

