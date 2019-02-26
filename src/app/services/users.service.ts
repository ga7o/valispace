import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any>  {

    if(!localStorage.getItem('usersList')){
      this.setStartingUsers()
    }

    return  of(JSON.parse(localStorage.getItem('usersList')));

  }

  // This method is used to add a user
  addUser() {
    return '';
  }

  // This method is used to remove a user
  removeUser(userId) {

    return '';
  }

  // This method is used to update a user
  updateUser(userId, userName, userPhone) {

    return '';
  }



  private setStartingUsers() {

    console.log('Setting up the starting users for the app')

    let usersObject = [
      {id:1, username:'mathil', phone:'992312312', role:'CEO', name:' Mathilde Saylors'},
      {id:2, username:'alia', phone:'986733455', role:'Designer', name: 'Alia Ginder'},
      {id:3, username:'freeman', phone:'971232343', role:'Developer', name: 'Freeman Litten'},
      {id:4, username:'piedad', phone:'992362345', role:'Sales', name:'Piedad Dewald'},
      {id:5, username:'beau', phone:'912342303', role:'PR', name:'Beau Siegel' }
    ]

    localStorage.setItem('usersList', JSON.stringify(usersObject))

  }
}
