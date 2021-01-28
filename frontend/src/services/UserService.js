function signIn(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email,password})
    };

    return fetch('/signin', requestOptions)
    .then(handleResponse)
    .then(user => {

        return user;
    });
}

function handleResponse(response) {
    return response.text(text => {
        const data = text && JSON.parse(text);
        return data;
    });
}

export const userService = {
    signIn,
};