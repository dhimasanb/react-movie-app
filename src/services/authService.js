import http from "./httpService";
import {apiUrl} from "../config";
import jwtDecode from "jwt-decode";

const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token";

http.setJWT(getJWT());

export async function login(email, password) {
    const {data: jwt} = await http.post(apiEndpoint, {email, password});
    localStorage.setItem(tokenKey, jwt)
}

export function loginWithJWT(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt)
    } catch (e) {
        return null;
    }
}

export function getJWT() {
    return localStorage.getItem(tokenKey)
}

export default {
    login,
    loginWithJWT,
    logout,
    getCurrentUser,
    getJWT
};