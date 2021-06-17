import { Injectable } from '@angular/core';
import { Hero } from "../interfaces/hero";
import { BehaviorSubject, Observable, of } from "rxjs";
import { MessagesService } from "./messages.service";
import { IdName } from "../interfaces/id-name.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private heroesUrl = 'api/heroes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private _heroes$$: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);
  public heroes$: Observable<Hero[]> = this._heroes$$.asObservable();

  private _skills$$: BehaviorSubject<IdName[]> = new BehaviorSubject<IdName[]>([]);
  public skills$: Observable<IdName[]> = this._skills$$.asObservable();
  constructor(
    private _messageService: MessagesService,
    private http: HttpClient) { }

  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }
  public getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  public addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  public updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    this._messageService.add(`HeroesService: ${message}`);
  }
}
