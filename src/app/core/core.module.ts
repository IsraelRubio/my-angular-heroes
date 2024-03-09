import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { LoadingInterceptor } from "./interceptors/loading.interceptor"
import { HTTP_INTERCEPTORS } from "@angular/common/http"

@NgModule({
    imports: [CommonModule],
    declarations: [],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: LoadingInterceptor,
        multi: true
      }
    ]
  })
  export class CoreModule {}