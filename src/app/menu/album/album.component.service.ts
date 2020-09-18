import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Album } from 'src/app/utils/interface/album-interface';

@Injectable()
export class AlbumService implements Resolve<any>
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

    getAlbuns(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`https://jsonplaceholder.typicode.com/albums`)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getPhotos(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`https://jsonplaceholder.typicode.com/photos`)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    deleteAlbum(idAlbum):Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.delete(`https://jsonplaceholder.typicode.com/albums/` + idAlbum)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    saveAlbum(album: Album):Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(`https://jsonplaceholder.typicode.com/albums/`, album)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
