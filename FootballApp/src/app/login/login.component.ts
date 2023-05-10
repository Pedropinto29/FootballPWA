import { Component } from '@angular/core';
import { User, UserLogin, UserService } from '../user.service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userLogin = new UserLogin()
  user = new User()
  constructor (private userService : UserService, private router: Router){}

  LoginUser(username : string, password : string)
  {
    this.userLogin.username = username;
    this.userLogin.password = password;
    console.log(username);
    console.log(password);

    this.userService.userExists(this.userLogin).subscribe(
      data =>{
        if (data){
          this.user = data
          this.userService.login(this.user).subscribe(
            data => {
              console.log(data.token);
              localStorage.setItem('token', data.token)
              this.router.navigate(['tabs/home'])
            }
          )
        } else{
          console.log("user not found");
        }
        
      }
    )
    
  }
}
