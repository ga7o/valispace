import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users: Object;

  constructor(private usersData: UsersService) { }

  ngOnInit() {
    this.usersData.getData().subscribe(data => {
      this.users = data;
      console.log(this.users)
    })

  }


  openModal() {

  }

}
