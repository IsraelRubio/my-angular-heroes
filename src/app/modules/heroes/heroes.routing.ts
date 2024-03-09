import { MainRoutes } from "src/app/common/routes/routes";
import { BREADCRUMBS } from "./constants/hero.constants";
import { HeroesDetailComponent } from "./pages/heroes-detail/heroes-detail.component";
import { HeroByIdResolver } from "./resolvers/hero-by-id.resolver";
import { HeroesListComponent } from "./pages/heroes-list/heroes-list.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

const HEROES_ROUTES: Routes = [
    {
      path: '',
      component: HeroesListComponent
    },
    {
      path: MainRoutes.CREATE,
      data: {
        creation: true,
        breadcrumb: BREADCRUMBS.CREATE
      },
      component: HeroesDetailComponent
    },
    {
      path: MainRoutes.EDIT,
      data: {
        breadcrumb: BREADCRUMBS.EDIT
      },
      children: [
        {
          path: ':id',
          component: HeroesDetailComponent,
          data: {
            edition: true
          },
          resolve: {
            hero: HeroByIdResolver
          }
        },
        {
          path: '**',
          redirectTo: `/${MainRoutes.HEROES}`,
          pathMatch: 'full'
        }
      ]
    },
    {
      path: MainRoutes.DETAIL,
      data: {
        breadcrumb: BREADCRUMBS.DETAIL
      },
      children: [
        {
          path: ':id',
          data: {
            detail: true
          },
          resolve: {
            hero: HeroByIdResolver
          },
          component: HeroesDetailComponent
        },
        {
          path: '**',
          redirectTo: `/${MainRoutes.HEROES}`,
          pathMatch: 'full'
        }
      ]
    },
    {
      path: '**',
      redirectTo: `/${MainRoutes.HEROES}`,
      pathMatch: 'full'
    }
  ]

  @NgModule({
    imports: [RouterModule.forChild(HEROES_ROUTES)],
    exports: [RouterModule]
  })
  export class HeroesRoutingModule {}