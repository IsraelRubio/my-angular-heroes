import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CoreModule } from "./core/core.module";

@NgModule({
    declarations: [AppComponent],
    imports: [
      CommonModule,
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule,
      BrowserModule,
      CoreModule
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule {}
