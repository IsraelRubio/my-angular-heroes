import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, signal, effect } from '@angular/core'
import { HeroService } from '../../services/hero.service'
import { Hero } from '../../interfaces/hero.interface'
import { Observable, Subject, finalize, takeUntil } from 'rxjs'
import {MatPaginator} from '@angular/material/paginator'
import {MatSort} from '@angular/material/sort'
import {MatTableDataSource} from '@angular/material/table'
import { HERO_COLUMNS_TABLE } from '../../constants/hero.constants'
import { Router } from '@angular/router'
import { MainRoutes } from 'src/app/common/routes/routes'
import { ConfirmDialogComponent } from 'src/app/common/components/confirm-dialog/confirm-dialog.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnInit, AfterViewInit, OnDestroy {

  protected dataSource!: MatTableDataSource<Hero>
  protected readonly displayedColumns: Array<string> = HERO_COLUMNS_TABLE
  
  @ViewChild(MatPaginator) private readonly _paginator!: MatPaginator
  @ViewChild(MatSort) private readonly _sort!: MatSort
  
  private readonly _heroes = signal<Array<Hero>>([])
  private readonly _destroy$ = new Subject()

  constructor(
    public dialog: MatDialog,
    private _router: Router, 
    private _heroService: HeroService
  ) {
    this.dataSource = new MatTableDataSource()
    this._initEffects()
  }

  ngOnInit(): void {
    this._initData()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this._paginator
    this.dataSource.sort = this._sort
  }

  ngOnDestroy(): void {
    this._destroy$.next(null)
    this._destroy$.complete()
  }

  protected addHero = () => this._router.navigate([
    MainRoutes.HEROES, MainRoutes.CREATE
  ])
  
  protected gotoEdit = (id: string): Promise<boolean> => this._router.navigate([
    MainRoutes.HEROES, MainRoutes.EDIT, id
  ])
  
  protected gotoDetail = (id: string): Promise<boolean> => this._router.navigate([
    MainRoutes.HEROES, MainRoutes.DETAIL, id
  ])

  protected deleteHero(hero: Hero): void {
    this._openConfirmDialog(hero)
    .pipe(takeUntil(this._destroy$))
    .subscribe((confirm: boolean) => {
      if(confirm) {
        this._heroes.set(
          this._heroes().filter((item) => item.id !== hero.id)
        )
      } 
    })
  }
  
  protected applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this._heroService.getHeroesByName(filterValue)
    .pipe(
      takeUntil(this._destroy$), 
      finalize(() => {
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage()
        }
      })
    ).subscribe((heroes: Array<Hero>) => {
      this._heroes.set(heroes)
    })
  }

  private _initEffects(): void {
    effect(() => {
      this.dataSource.data = this._heroes()
    })
  }

  private _initData(): void {
    this.dataSource = new MatTableDataSource()
    this._getHeroes()
  }

  private _getHeroes(): void {
    this._heroService.getHeroes()
    .pipe(takeUntil(this._destroy$))
    .subscribe((heroes: Array<Hero>) => {
      this._heroes.set(heroes)
    })
  }

  private _openConfirmDialog(hero: Hero): Observable<boolean> {
    return this.dialog.open(ConfirmDialogComponent, { 
      autoFocus: false,
      disableClose: true,
      data: {
        title: 'Remove hero',
        subtitle: 'Are you sure you want to eliminate the hero?',
        descriptionName: hero.name,
        icon: 'info',
        isNotification: false
      }
    })
    .afterClosed()
  }
}
