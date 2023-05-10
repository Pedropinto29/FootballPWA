import { Component, OnInit } from '@angular/core';
import { Article, ArticleService } from '../article.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent  implements OnInit {
  article = new Article()
  title:string = "";
  subtitle:string = "";
  body: string = "";
  constructor(private articleService:ArticleService, private route: ActivatedRoute, private router: Router){}

  id = this.route.snapshot.params["id"]
  ngOnInit() {
    this.articleService.getArticle(this.id).subscribe(
      data =>{
        this.article = data
        this.title = this.article.title
        this.subtitle = this.article.subtitle
        this.body = this.article.body
        console.log(this.body)
      }
    )
  }

  edit(newTitle:string, newSubtitle: string, newBody:string){
    this.article.title = newTitle;
    this.article.subtitle = newSubtitle;
    this.article.body = newBody;

    this.articleService.putArticle(this.id, this.article).subscribe(
      data=> {
        console.log("Article edited")
      }
    )

    this.router.navigate(['tabs'])
  }
}
