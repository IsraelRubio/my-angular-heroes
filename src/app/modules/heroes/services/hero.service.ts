import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, map, of } from 'rxjs'
import { CreateHero, Hero, UpdateHero } from '../interfaces/hero.interface'
import { ENVIRONMENT } from 'src/app/environments/environment'

@Injectable()
export class HeroService {

  constructor(private _httpClient: HttpClient) { }

  getHeroes(): Observable<Array<Hero>> {
    return this._httpClient.get<Array<Hero>>(`${ENVIRONMENT.apiUrl}/heroes`)
    .pipe(catchError(this._handleError('getHeroes', [])))
  }

  getHeroById(id: string): Observable<Array<Hero>> {
    const idParam = encodeURIComponent(id)
    return this._httpClient.get<Array<Hero>>(`${ENVIRONMENT.apiUrl}/heroes?id=${idParam}`)
    .pipe(catchError(this._handleError('getHeroes', [])))
  }

  createHero(requestCreateHero: CreateHero): Observable<Hero | null> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this._httpClient.post<Hero>(`${ENVIRONMENT.apiUrl}/hero`, requestCreateHero, httpOptions)
    .pipe(catchError(this._handleError('createHero', null)))
  }

  updateHero(requestUpdateHero: UpdateHero): Observable<Hero | null> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this._httpClient.put<Hero>(`${ENVIRONMENT.apiUrl}/hero`, requestUpdateHero, httpOptions)
    .pipe(catchError(this._handleError('getHeroes', null)))
  }

  getHeroesByName(name: string) {
    const nameParam = encodeURIComponent(name)
    return this._httpClient.get<Array<Hero>>(`${ENVIRONMENT.apiUrl}/heroes?name=${nameParam}`)
    .pipe(catchError(this._handleError('getHeroes', [])))
  }

  private _handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`)

      return of(result as T)
    }
  }
}
