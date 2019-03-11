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

  areaConfig: any;

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

  searchUser: string
  isSearchMode:boolean

  postValueChange(event){

    if(event.key === '@') {
      this.isSearchMode = true
    }
    else {


    }

  }

  setupAreaConfig () {
    console.log('list')
    this.areaConfig = {
      dropdown: [{
        // trigger can be a string or a regexp
        // in this case this regexp should match Twitter-style @mentions
        trigger: /@([A-Za-z]+[_A-Za-z0-9]+)/gi,
        // The list() function gets called when the trigger matches
        // it should return a list of elements to be suggested
        list: function(match: any[], callback: (arg0: any) => void){
          // match is the regexp return, in this case it returns
          // [0] the full match, [1] the first capture group => username

          console.log('list')
          this.usersData.searchUser(match[1])
            .subscribe(data => {
            this.users = data;
            console.log(this.users)
          }).success(function(data){
            // Prepare the fake data
            var listData = data.map(function(element){
              return {
                display: element.userName, // This gets displayed in the dropdown
                item: element // This will get passed to onSelect
              };
            });
            callback(listData);
          }).error(function(err){
            console.error(err);
          });
        },
        // Function that gets called when an item is selected
        // it's return value gets added to the textarea
        onSelect: function(item){
          return item.userName;
        },
        // mode can be append or replace
        // here we want replace because the user has already typed
        // part of the username
        mode: 'replace'
      }
      ]
    }
  }

}
