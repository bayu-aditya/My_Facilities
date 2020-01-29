import { user_api, refresh_api } from './api/link';

const SET_NAME = "SET_NAME";
const SELECT_ORGANIZATION = "SELECT_ORGANIZATION";
const FETCH_NAME_BEGIN = "FETCH_NAME_BEGIN";
const FETCH_NAME_SUCCESS = "FETCH_NAME_SUCCESS";
const FETCH_NAME_FAILED = "FETCH_NAME_FAILED";
const TOKEN_REFRESHER_BEGIN = "TOKEN_REFRESHER_BEGIN";
const TOKEN_REFRESHER_SUCCESS = "TOKEN_REFRESHER_SUCCESS";
const TOKEN_REFRESHER_FAILED = "TOKEN_REFRESHER_FAILED";

export const settingName = (name) => ({
    type: SET_NAME,
    name: name
})

export const setIdOrg = (id) => ({
    type: SELECT_ORGANIZATION,
    id_org: id
})

export const fetchNameBegin = () => ({
    type: FETCH_NAME_BEGIN
})
export const fetchNameSuccess = (name) => ({
    type: FETCH_NAME_SUCCESS,
    name: name
})
export const fetchNameFailed = (error) => ({
    type: FETCH_NAME_FAILED,
    error: error
})
export const tokenRefresherBegin = () => ({
    type: TOKEN_REFRESHER_BEGIN
})
export const tokenRefresherSuccess = (access_token) => ({
    type: TOKEN_REFRESHER_SUCCESS,
    access_token: access_token
})
export const tokenRefresherFailed = (error) => ({
    type: TOKEN_REFRESHER_FAILED,
    error: error
})

export function fetchName() {
    return (dispatch, getState) => {
        let access_token = getState().access_token;
        dispatch(fetchNameBegin());
        return fetch(user_api(), {
            method: 'GET',
            headers: {"Authorization": "Bearer " + access_token}
        })
            .then((res) => {
                if (res.status === 202) {
                    return res.json();
                } else if (res.status == 401) {
                    dispatch(tokenRefresher(fetchName));
                }
            })
            .then(json => {
                dispatch(fetchNameSuccess(json["name"]));
            })
            .catch(error => dispatch(fetchNameFailed(error)));
    };
}

export function fetchOrganizations(self) {
    return (dispatch, getState) => {
        let access_token = getState().access_token;
        return fetch(self.url, {
            method: "GET", 
            headers: {"Authorization": "Bearer " + access_token}
        })
            .then((res) => {
                if (res.status === 202) {
                    return res.json()
                } else if (res.status === 401) {
                    dispatch(tokenRefresher(fetchOrganizations, self))
                }
            })
            .then(json => {
                self.setState({
                    organization: json["organization"],
                    isLoad: false
                })
            })
            .catch(error => console.log(error));
    }
}

export function tokenRefresher(func, args = null) {
    return (dispatch, getState) => {
        let refresh_token = getState().refresh_token;
        dispatch(tokenRefresherBegin());
        return fetch(refresh_api(), {
            method: 'POST',
            headers: {"Authorization": "Bearer " + refresh_token}
        })
            .then(res => res.json())
            .then(json => {
                dispatch(tokenRefresherSuccess(json["access_token"]));
                dispatch(func(args));
            })
            .catch(error => dispatch(tokenRefresherFailed(error)))
    }
}