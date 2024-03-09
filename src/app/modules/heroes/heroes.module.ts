import { NgModule } from "@angular/core"
import { HeroesListComponent } from "./pages/heroes-list/heroes-list.component"
import { HeroesDetailComponent } from "./pages/heroes-detail/heroes-detail.component"
import { HeroService } from "./services/hero.service"
import { CommonModule } from "@angular/common"
import { MatButtonModule } from "@angular/material/button"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatTableModule } from "@angular/material/table"
import { MatSortModule } from "@angular/material/sort"
import { MatPaginatorModule } from "@angular/material/paginator"
import { MatIconModule } from "@angular/material/icon"
import { HeroesRoutingModule } from "./heroes.routing"
import { ReactiveFormsModule } from "@angular/forms"
import { ConfirmDialogComponent } from "src/app/common/components/confirm-dialog/confirm-dialog.component"
import { UppercaseDirective } from "src/app/common/directives/uppercase.directive"

@NgModule({
    imports: [
        CommonModule, 
        HeroesRoutingModule,
        ReactiveFormsModule,
        MatTableModule, 
        MatSortModule, 
        MatPaginatorModule, 
        MatButtonModule, 
        MatIconModule,
        MatFormFieldModule, 
        MatInputModule,
        ConfirmDialogComponent,
        UppercaseDirective
    ],
    providers: [
        HeroService
    ],
    declarations: [
      HeroesListComponent,
      HeroesDetailComponent
    ]
  })
  export class HeroesModule {}