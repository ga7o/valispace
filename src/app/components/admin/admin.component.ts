import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users: Object;

  closeResult: string;

  modalType: string;

  submitError: string;

  createMode: boolean;

  removeMode: boolean;

  buttonText: string;

  modelUser: any = {};

  constructor(
    private usersData: UsersService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.usersData.getData().subscribe(data => {
      this.users = data;
      console.log(this.users)
    })

  }


  openModal(content, type, user) {

    this.modelUser = Object.assign({}, user);

    switch (type) {
      case 'create' :
        this.modalType = 'Create user';
        this.createMode = true
        this.removeMode = false
        this.buttonText = 'Create'
        break;
      case 'remove':
        this.modalType = 'Remove user';
        this.createMode = false
        this.removeMode = true
        this.buttonText = 'Remove'
        break;
      default:
        this.createMode = false
        this.removeMode = false
        this.modalType = 'Edit user';
        this.buttonText = 'Update'
    }


    this.modalService
      .open(content, {ariaLabelledBy: 'modal-basic-title'})
      .result
      .then((result) => {
        this.closeResult = `${result}`;
      }, (reason) => {
        this.closeResult = `${this.getDismissReason(reason)}`;
        this.modelUser = null
      });
  }

  private getDismissReason(reason: any): string {
    this.submitError = ''
    if (reason === ModalDismissReasons.ESC) {
      return '';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return '';
    } else {
      return  `${reason}`;
    }
  }

  onSubmit() {

    if (this.createMode) {
      console.log('Creating new user: ', this.modelUser)
      this.usersData
        .addUser(this.modelUser)
        .subscribe(
          data => {
            this.submitError = ''
            this.users = data;
            this.modalService.dismissAll('Created user')
          },
          error1 => {
            this.submitError = error1
            console.log(error1)
          }
        )
    }
    if (this.removeMode ) {
      console.log('Removing user: ', this.modelUser)
      this.usersData
        .removeUser(this.modelUser)
        .subscribe(
          data => {
            this.submitError = ''
            this.users = data;
            this.modalService.dismissAll('Removed user')
          },
          error1 => {
            this.submitError = error1
            console.log(error1)
          }
        )
    }
    else {

      console.log('Updating new user: ', this.modelUser)

      this.usersData
        .updateUser(this.modelUser)
        .subscribe(
          data => {
            this.submitError = ''
            this.users = data;
            this.modalService.dismissAll('Updated user')
          },
          error1 => {
            this.submitError = error1
            console.log(error1)
          }
        )

    }
  }
}
