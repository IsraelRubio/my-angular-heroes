import type { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { LoadingService } from '../services/loading.service'
import { Observable, catchError, finalize, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor {
    constructor(public loadingService: LoadingService) {} 

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.loadingService.setLoading(true)

        return next.handle(req).pipe(
            finalize(() => {
                this.loadingService.setLoading(false)
            }),
            catchError((error: HttpErrorResponse) => {
              this.loadingService.setLoading(false)
              return throwError(() => error)
            })
        )
    }
}
