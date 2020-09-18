import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class CommonService implements Resolve<any>
{
    routeParams: any;
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([

            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getUsers(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`https://jsonplaceholder.typicode.com/users`)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
