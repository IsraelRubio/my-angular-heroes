import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { HeroForm } from '../../interfaces/hero-form.interface'
import { CreateHero, Hero, UpdateHero } from '../../interfaces/hero.interface'
import { FIVE, ZERO } from 'src/app/common/constants/global.constants'
import { BREADCRUMBS } from '../../constants/hero.constants'
import { HeroService } from '../../services/hero.service'
import { EMPTY, Observable, Subject, concatMap, from, iif, mergeMap, takeUntil } from 'rxjs'
import {MatDialog} from '@angular/material/dialog'
import { ConfirmDialogComponent } from 'src/app/common/components/confirm-dialog/confirm-dialog.component'
import { MainRoutes } from 'src/app/common/routes/routes'

@Component({
  selector: 'app-heroes-detail',
  templateUrl: './heroes-detail.component.html',
  styleUrls: ['./heroes-detail.component.scss']
})
export class HeroesDetailComponent implements OnInit, OnDestroy { 
  protected form!: FormGroup<HeroForm>
  protected subTitle = ''

  private _data!: Hero
  private readonly _destroy$ = new Subject()

  constructor(
    public dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _heroService: HeroService
  ){}

  ngOnInit(): void {
    this._initData()
    this._initForm(this._data)
  }

  ngOnDestroy(): void {
    this._destroy$.next(null)
    this._destroy$.complete()
  }

  get isEdition(): boolean {
    return Boolean(this._activatedRoute.snapshot.data['edition'])
  }

  get isCreation(): boolean {
    return Boolean(this._activatedRoute.snapshot.data['creation'])
  }

  get isDetail(): boolean {
    return Boolean(this._activatedRoute.snapshot.data['detail'])
  }

  protected sendHero(): void {
    const createHeroRequest: CreateHero = this._mapHeroForm(this.form) 
    
    if (this.isCreation) {
      this._createHero(createHeroRequest)
    }

    if (this.isEdition) {
      const updateHeroRequest: UpdateHero = {
        ...createHeroRequest,
        id: this._data.id
      }
      this._updateHero(updateHeroRequest)
    }
  }

  private _createHero(createHeroRequest: CreateHero): void {
    this._heroService.createHero(createHeroRequest)
    .pipe(
      takeUntil(this._destroy$),
      mergeMap((hero: Hero | null) => 
        iif(() => Boolean(hero), this._openConfirmDialog(), EMPTY)
      )
    ).subscribe()
  }

  private _updateHero(updateHeroRequest: UpdateHero): void {
    this._heroService.updateHero(updateHeroRequest)
    .pipe(
      takeUntil(this._destroy$),
      mergeMap((hero: Hero | null) => 
        iif(() => Boolean(hero), this._openConfirmDialog(), EMPTY)
      )
    ).subscribe()
  }

  private _initData() {
    this._data = this._activatedRoute.snapshot.data?.['hero']
    this.subTitle = !this.isCreation ? this._data.name : BREADCRUMBS.CREATE
  }

  private _initForm(hero: Hero) {
    this.form = this._formBuilder.group<HeroForm>({
      name: new FormControl({ value: hero?.name ?? '', disabled: this.isDetail }, [Validators.required]),
      alias: new FormControl({ value: hero?.alias ?? '', disabled: this.isDetail }, [Validators.required]),
      power: new FormControl({ value: hero?.power ?? '', disabled: this.isDetail }, [Validators.required]),
      origin: new FormControl({ value: hero?.origin ?? '', disabled: this.isDetail }, [Validators.required]),
      alignment: new FormControl({ value: hero?.alignment ?? '', disabled: this.isDetail }, [Validators.required]),
      age: new FormControl(
        { value: hero?.age, disabled: this.isDetail } ?? ZERO, 
        [Validators.required, Validators.min(FIVE)]
      )
    })
  }

  private _mapHeroForm(heroForm: FormGroup<HeroForm>): CreateHero {
    return {
      name: heroForm.value.name!,
      alias: heroForm.value.alias!,
      alignment: heroForm.value.alignment!,
      origin: heroForm.value.origin!,
      power: heroForm.value.power!,
      age: heroForm.value.age!
    }
  }

  private _openConfirmDialog(): Observable<boolean> {
    return this.dialog.open(ConfirmDialogComponent, { 
      autoFocus: false,
      disableClose: true,
      data: {
        title: 'Saved successful!',
        icon: 'check_circle',
        isNotification: true
      }
    })
    .afterClosed()
    .pipe(
      concatMap(() => from(this._goBackToSearch()))
    )
  }

  private _goBackToSearch = () => this._router.navigate([MainRoutes.HEROES])
}
