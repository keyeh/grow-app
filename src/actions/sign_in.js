import {
    AUTHED_USER,
    AUTHFAILED_USER
} from './types';

import {API_SERVER} from '../api/api.js';
import reactCookie from 'react-cookie';


export function signinUser({email, password}) {
    console.log(email, password);
    const emailCandidate = email
    return (dispatch, getState) => {
        console.log(getState)
        const successPath = getState().auth.successPath;


        const request = new Request(`${API_SERVER}/authenticate`, {
            method: 'POST',
            headers: new Headers({ 'Content-Type' : 'application/json'}),
            body: JSON.stringify({auth:{email, password}})
        });

        return fetch(request)
            .then((response) => {
                if (response.status == 404) {
                    dispatch({ type: AUTHFAILED_USER, payload: "Incorrect email or password" })
                    return null;
                }
                if(response.status == 201) {
                    return response.json();
                }
                dispatch({ type: AUTHFAILED_USER, payload: "Server Error" });
                return null;
            })
            .then(
                (result) => {
                    if (result) {
                        reactCookie.save('authorization', result.jwt, { path: '/' });
                        reactCookie.save('email', email, { path: '/' });
                        
                        dispatch({ type: AUTHED_USER, payload: {auth_token: result.jwt, email: emailCandidate }});

                        if (successPath) {
                            // browserHistory.push(successPath);
                        } else {
                            // browserHistory.push('/');
                        };
                    };
                },
                (error) => {
                    dispatch({ type: AUTHFAILED_USER, payload: "Server Error" });
                }
            )
    }
}