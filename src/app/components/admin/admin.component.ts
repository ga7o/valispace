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

    switch (type) {
      case 'create' :
        this.modalType = 'Create user';
        break;
      case 'remove':
        this.modalType = 'Remove user';
        break;
      default:
        this.modalType = 'Edit user';
    }


    this.modalService
      .open(content, {ariaLabelledBy: 'modal-basic-title'})
      .result
      .then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
