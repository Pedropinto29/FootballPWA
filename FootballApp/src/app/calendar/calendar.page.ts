import { Component } from '@angular/core';
import { Game, GamesService } from '../games.service';
import { AlertController } from '@ionic/angular';
import { style } from '@angular/animations';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss']
})
export class CalendarPage {
  games: Game[] = []
  userType : string = ""
  gameId : number = 0

  game = new Game()
  constructor (private gamesService : GamesService, private alertCtrl: AlertController) {}

  ngOnInit(){
    this.gamesService.getGamesList().subscribe(
      data => {
        this.games = data.games;
        this.userType = data.admin;
        console.log(this.userType);
        console.log(this.games);
      }
    )
  }

  async edit(game : any) {
    this.gameId = game.gameId
    console.log(this.gameId)
    console.log(this.games)
    await this.alertCtrl.create({
      header : "Edit game" + this.gameId,
      inputs:[
        {type: 'number', name : 'homeScore', placeholder: 'homeScore'},
        {type: 'number', name: 'awayScore', placeholder: 'awayScore'}
      ],
      buttons : [
        {
          text : 'Edit score',
          handler: (res) => {
            this.gamesService.getGame(this.gameId).subscribe(
              data => {
                this.game = data
                this.game.homeScore = res.homeScore
                this.game.awayScore = res.awayScore
                console.log(this.game.homeScore)
                this.gamesService.editGame(this.gameId, this.game).subscribe(
                  data => {
                    console.log('Game updated')
                    window.location.reload()
                  }
                )
              }
            )
            
          }
        }
      ]
    }).then(res => res.present())
    // this.dialogRef.open(EditPopUpComponent, {
    //   data:{gameId : this.gameId}
    // })

  }

}
