import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users.service";
import {PostsService} from "../../services/posts.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users: Object;

  posts: Object;

  closeResult: string;

  modelPost: any = {};

  modalType: string;

  submitError: string;

  createMode: boolean;

  removeMode: boolean;

  buttonText: string;

  mentionConfig: any;


  constructor(
    private usersData: UsersService,
    private postsData: PostsService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    // this.setupAreaConfig()
    this.postsData
      .getData().subscribe(data => {
      this.posts = data;
      console.log(this.posts)
    })

    this.usersData.getData().subscribe(data => {
      this.users = data;
      console.log(this.users)
    })

    this.mentionConfig = {
      mentions: [
        {
          items: this.users ,
          triggerChar: '@',
          labelKey: 'username'
        },
        {
          items: this.users ,
          triggerChar: '#',
          labelKey: 'phone'
        }
      ]
    }


  }


  openModal(content) {

    this.modelPost = {
      postText : ''
    }

    console.log('this.modelPost ', this.modelPost)
    this.modalType = 'Create Post';

    this.buttonText = 'Save'

    this.modalService
      .open(content, {ariaLabelledBy: 'modal-basic-title'})
      .result
      .then((result) => {
        this.closeResult = `${result}`;
      }, (reason) => {
        this.closeResult = `${this.getDismissReason(reason)}`;
        this.modelPost = null
      });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return '';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return '';
    } else {
      return  `${reason}`;
    }
  }


  onSubmit() {
    console.log('TOBEIMPLEMENTED')
  }


}
