import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import * as _ from 'lodash';

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
  addUser(user) : Observable<any>{

    try {

      let userList = JSON.parse(localStorage.getItem('usersList'))
      // If user exists

      let userFilter = _.find(userList, {'id': user.id})

      if (_.find(userList, function(elem) {
        return elem.phone === user.phone && elem.id !== user.id
      })) {
        console.log('Phone number already exist ')

        return throwError('Phone number already exist ' );
      }


      user.id = parseInt(_.orderBy(userList, ['id'])[userList.length - 1].id) + 1

      console.log('New user ', user)

      userList.push(user)

      localStorage.removeItem('usersList')

      localStorage.setItem('usersList', JSON.stringify(userList))

      return of(JSON.parse(localStorage.getItem('usersList')))

    }
    catch (e) {
      return throwError('Error ', e);
    }

  }

  // This method is used to remove a user
  removeUser(user): Observable<any> {


    try {

      let userList = JSON.parse(localStorage.getItem('usersList'))
      let userFilter = _.remove(userList, {'id': user.id})

      console.log('userFilter ', userFilter)
      console.log('userList ', userList)

      localStorage.removeItem('usersList')

      localStorage.setItem('usersList', JSON.stringify(userList))

      return of(JSON.parse(localStorage.getItem('usersList')))

    }
    catch (e) {
      return throwError('Error ', e);
    }
  }


  isPhoneDuplicated(ele, elementToUpdate){
    return ele.phone === elementToUpdate.phone && ele.id !== elementToUpdate.id
  }

  // This method is used to update a user
  updateUser(user): Observable<any> {

    try {

      let userList = JSON.parse(localStorage.getItem('usersList'))
      // If user exists

      let userFilter = _.find(userList, {'id': user.id})

      if (_.find(userList, function(elem) {
        return elem.phone === user.phone && elem.id !== user.id
      })) {
        console.log('Phone number already exist ')

        return throwError('Phone number already exist ' );
      }

      if(userFilter) {
        userFilter['name'] = user.name
        userFilter['role'] = user.role
        userFilter['username'] = user.username
        userFilter['phone'] = user.phone

        localStorage.removeItem('usersList')

        localStorage.setItem('usersList', JSON.stringify(userList))

        return of(JSON.parse(localStorage.getItem('usersList')))
      }
      else {
        console.log('updateUser: ', userFilter)
        console.log('update: ', user)

        return of(JSON.parse(localStorage.getItem('usersList')))
      }
    }
    catch (e) {
      return throwError('Error ', e);
    }

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
