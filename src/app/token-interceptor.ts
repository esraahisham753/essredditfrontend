import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from "rxjs";
import { AuthService } from "./auth/shared/auth-service";
import { loginResponsePayload } from "./auth/login/login-response.payload";

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
    private isTokenRefreshing: boolean = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1) {
            return next.handle(req);
        }

        const jwtToken = this.authService.getJwtToken();

        if (jwtToken) {
            return next.handle(this.addToken(req, jwtToken))
                .pipe(catchError(err => {
                    if (err instanceof HttpErrorResponse && err.status === 401) {
                        return this.handleRefreshToken(req, next);                
                    } else {
                        return throwError(() => err);
                    }
                }))
        }

        return next.handle(req);
    }

    handleRefreshToken(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isTokenRefreshing) {
            this.isTokenRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken()
                .pipe(switchMap((refreshTokenResponse: loginResponsePayload) => {
                    this.isTokenRefreshing = false;
                    this.refreshTokenSubject.next(refreshTokenResponse.authenticationToken);
                    return next.handle(this.addToken(req, refreshTokenResponse.authenticationToken));
                }),
                catchError(err => {
                    this.isTokenRefreshing = false;
                    this.authService.logout();
                    return throwError(() => err);
                })
            )
        } else {
            return this.refreshTokenSubject.pipe(
                filter(res => res !== null),
                take(1),
                switchMap(res => {
                    return next.handle(this.addToken(req, res));
                })
            ); 
        }
    }
    

    addToken(req: HttpRequest<any>, token: String): HttpRequest<any>{
        return req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + token)
        });
    }
}