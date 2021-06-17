import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroesService } from "../../services/heroes.service";

@Component({
  selector: 'app-edit-heroes',
  templateUrl: './edit-heroes.component.html',
  styleUrls: ['./edit-heroes.component.scss']
})
export class EditHeroesComponent implements OnInit {
  hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,
    private _service: HeroesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  public getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this._service.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  public goBack(): void {
    this.location.back();
  }

  public save(): void {
    if (this.hero) {
      this._service.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
}

