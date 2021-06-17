import {Component, OnInit} from '@angular/core';
import {Hero} from '../../interfaces/hero';
import {HeroesService} from "../../services/heroes.service";
import { FormGroup } from "@angular/forms";
import { FormControl } from "@angular/forms";
import {Validators} from "@angular/forms";
import { Skills } from "../../mocks/skills.mock";
import {IdName} from "../../interfaces/id-name.interface";

@Component({
  selector: 'app-add-heroes',
  templateUrl: './add-heroes.component.html',
  styleUrls: ['./add-heroes.component.scss']
})
export class AddHeroesComponent implements OnInit {
  public myForm : FormGroup;
  public skills: IdName[] = Skills;
  public heroes: Hero[] = [];

  constructor(private _service: HeroesService,
  ) {
    this.myForm = new FormGroup({
      "heroName": new FormControl("Windstorm", Validators.required),
      "heroPower": new FormControl(1, Validators.required),
      "heroSkill": new FormControl([], Validators.required),
      "heroLevel": new FormControl(1, Validators.required)
    });
  }

  ngOnInit(): void {
    this._service.heroes$.subscribe((items: Hero[]) => {
      this.heroes = items;
    });
    this.myForm.valueChanges.subscribe((value) => console.log(value));
  }
public onSubmit() {
    console.log(this.myForm.value);
    console.log(this.heroes);
}
public add(name: string): void {
  // name = name.trim();
  if (!name) { return; }
  this._service.addHero({ name } as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    });
}
}
