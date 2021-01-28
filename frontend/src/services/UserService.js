import Cookies from 'js-cookie';

function signIn(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email,password})
    };

    return fetch('/signin', requestOptions)
    .then(handleResponse)
    .then(user => {

        Cookies.get('jwt');
        return user;
    });
}

function signOut() {
    Cookies.remove('jwt');
}

function handleResponse(response) {
    return response.text(text => {
        const data = text && JSON.parse(text);
        if(!response.ok){
            if(response.status === 401){
                signOut();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

export const userService = {
    signIn,
    signOut
};