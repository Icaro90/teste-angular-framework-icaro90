import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/utils/interface/post-interface';

@Injectable()
export class PostService implements Resolve<any>
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

    getPosts(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`https://jsonplaceholder.typicode.com/posts`)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    deletePost(idPost): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.delete(`https://jsonplaceholder.typicode.com/posts/` + idPost)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    savePost(post: Post):Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(`https://jsonplaceholder.typicode.com/posts/`, post)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
