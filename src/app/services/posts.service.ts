import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor() { }

  getData(): Observable<any>  {

    return  of(JSON.parse(localStorage.getItem('postList')));

  }




}
