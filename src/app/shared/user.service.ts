import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { routes } from './constants/routes';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    playpowerEmail: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    designation: '',
    department: '',
    dateOfJoining: '',
    phone: '',
    address: '',
    admin: '',
    _id: '',
  };

  updatedUser: User = {
    playpowerEmail: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    designation: '',
    department: '',
    dateOfJoining: '',
    phone: '',
    address: '',
    admin: '',
    _id: '',
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }
  
  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/registerUser',user);
  }

  deleteUser(id){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        })
      };
    return this.http.delete(environment.apiBaseUrl+'/deleteUser/'+id, httpOptions);
  }

  fetchUser(id){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        })
      };
    return this.http.get(environment.apiBaseUrl+'/getUserById/'+id, httpOptions)
  }
  
  updateUserDetails(userDetails){
    this.updatedUser.playpowerEmail=userDetails.playpowerEmail;
    this.updatedUser.password=userDetails.password;
    this.updatedUser.firstName=userDetails.firstName;
    this.updatedUser.middleName=userDetails.middleName;
    this.updatedUser.lastName=userDetails.lastName;
    this.updatedUser.designation=userDetails.designation;
    this.updatedUser.department=userDetails.department;
    this.updatedUser.dateOfJoining=userDetails.dateOfJoining;
    this.updatedUser.phone=userDetails.phone;
    this.updatedUser.address=userDetails.address;
    this.updatedUser.admin=userDetails.admin;
  }

  updateUser(user: User,id){
    return this.http.put(environment.apiBaseUrl+'/updateUser/'+id,user);
  }

  login(authCredentials){
    return this.http.post(environment.apiBaseUrl + routes.AUTHENTICATE, authCredentials,this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + routes.USERPROFILE);
  }

  //Helper Methods

  adminOrNot: boolean;
  isAdmin(Admin){
    if(Admin=="false"){
      this.adminOrNot = false;
    }
    else{
      this.adminOrNot = true;
    }
  }

  findAdmin(){
    if(this.adminOrNot)
      return true;
    else
      return false;
  }

  getAdmin(){
    return this.adminOrNot;
  }

  getUsers() {
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
          })
        };
        return this.http.get(environment.apiBaseUrl + '/getUsers', httpOptions);
  }

  id: boolean;
  setId(id){
    this.id=id;
  }

  getId(){
    return this.id;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}