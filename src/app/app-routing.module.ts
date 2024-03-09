import { RouterModule, Routes } from "@angular/router"
import { MainRoutes } from "src/app/common/routes/routes"
import { NgModule } from "@angular/core"

  export const ROUTES: Routes = [
    {
      path: MainRoutes.HEROES,
      loadChildren: () =>
        import('./modules/heroes/heroes.module').then(
          (m) => m.HeroesModule
        )
    },
    {
      path: '',
      redirectTo: MainRoutes.HEROES,
      pathMatch: 'full'
    },
    {
      path: '**',
      redirectTo: MainRoutes.HEROES,
      pathMatch: 'full'
    }
  ]

  @NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }