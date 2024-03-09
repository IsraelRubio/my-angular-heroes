
import type { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router'
import { Hero } from '../interfaces/hero.interface'
import { HeroService } from '../services/hero.service'
import { Observable, first, map } from 'rxjs'
import { ZERO } from 'src/app/common/constants/global.constants'
import { inject } from '@angular/core'

export const HeroByIdResolver: ResolveFn<Observable<Hero>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  heroService: HeroService = inject(HeroService)
) => {
  return heroService.getHeroById(String(route.paramMap.get('id')))
  .pipe(
    first(),
    map((heroes) => heroes[ZERO])
  )
}