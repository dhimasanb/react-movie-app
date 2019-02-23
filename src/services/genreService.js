import http from "./httpService";
import {apiUrl} from "../config";

export function getGenres() {
    return http.get(apiUrl + "/genres");
}