let signIn = (email, password) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  return fetch("/signin", requestOptions)
    .then(handleResponse)
    .then((user) => {
      return user;
    });
};

let signUp = (username, email, password) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      };
    
      return fetch("/signup", requestOptions)
        .then(handleResponse)
        .then((user) => {
          return user;
        });
};

let handleResponse = (response) => {
  return response.text((text) => {
    const data = text && JSON.parse(text);
    return data;
  });
};

export const signInService = {
  signIn
};

export const signUpService = {
    signUp
}


