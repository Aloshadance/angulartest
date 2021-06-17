import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { HeroesService } from "../../services/heroes.service";

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})

export class HeroesListComponent implements OnInit {
  public heroes: Hero[] = [];

  constructor(private _service: HeroesService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this._service.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

}

