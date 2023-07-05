import axios from "axios";
import { Project, User, User_Project } from "./Classes/entity_class";

const HOST = "http://localhost:8080";



function post(url, body = {}, param = {}) {
  return axios.post(HOST + url, body);
}
function postParam(url, param) {
  return post(url, {}, param);
}
function postBody(url, body) {
  return post(url, body);
}
function postUrl(url) {
  return axios.post(HOST + url);
}
function get(url, param = {}) {
  return axios.get(HOST + url);
}
function put(url, body) {
  return axios.put(HOST + url, body);
}
function del(url, body = {}) {
  return axios.delete(HOST + url, body);
}

export const API = {
    addUser:(user:User) => post("/add-user",user),
    login: (username: string, password: string) =>
      postBody("/authenticate-user", { username: username, password: password }),
    getAllUser: () => get("/get-all-user"),
    createProject: (project: Project) => post("/create-project",project),
    getUserByUsername: (username: string) => get("/get-by-username/"+username),
    getAllProject: () => get("/get-all-project"),
    addProjectMember: (id: number) => post("/add-user_project/"+id),
    getUserById: (id: number) => get("/get-user-by-id/"+id),
    getProjectById: (id : number) => get("/get-project-by-id/"+id),
    deleteProjectById : (id : number) =>post("/delete-project-by-id/"+id),
    updateProject: (project: Project) => post("/update-project",project)
 }
