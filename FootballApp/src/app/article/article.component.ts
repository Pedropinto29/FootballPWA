import { Component, OnInit } from '@angular/core';
import { Article, ArticleService } from '../article.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent  implements OnInit {
  article = new Article()
  title:string = "";
  subtitle:string = "";
  body:string = "";
  userId:number = 0;
  writter : string = "";

  constructor (private articleService: ArticleService, private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    this.articleService.getArticle(this.route.snapshot.params["id"]).subscribe(
      data => {
        this.article = data
        this.title = this.article.title
        this.subtitle = this.article.subtitle
        this.body = this.article.body
        this.userId = this.article.userId 
        console.log("heyyyyyy", this.userId)

        this.userService.getUsername(this.userId).subscribe(
          data => {
            this.writter = data.username
          }
        )
      }  
    )
  }
}
