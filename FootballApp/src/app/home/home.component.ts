import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService, Article } from '../article-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  articles: Article[] = []
  userType : string = ""

  constructor (private articleService : ArticleService, private router:Router) {}

  ngOnInit() {
    this.articleService.getArticlesList().subscribe(
      data => {
        this.articles = data.articles
        this.userType = data.admin
        console.log(this.articles);
        console.log(this.userType)
      }
    )
  }

  viewArticle(article:any){
    let articleId = article.articleId
    console.log(articleId)
    this.router.navigate(['article',articleId]);
  }

  newArticle(){
    this.router.navigate(['article'])
  }

  edit(article:any){
    let articleId = article.articleId
    this.router.navigate(['edit', articleId]);
  }

  delete(article:any){
    let articleId = article.articleId
    console.log(articleId);

    this.articleService.deleteArticle(articleId).subscribe(
      data => {
        console.log("Article Deleted");
      }
    )

    window.location.reload()
  }
}
