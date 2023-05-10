import { Component } from '@angular/core';
import { User, UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  user = new User()  
  constructor (private userService : UserService){}
  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      data => {
        this.user = data
        console.log(this.user)
      }
    )
  }

  annualPlace() {
    console.log(this.user.userId)
    this.user.annualPlace = "Gate E"
    this.userService.annualPlace(this.user.userId, this.user).subscribe(
      data => {
        console.log("Bought Annual Place")
      }
    )
  }
}
