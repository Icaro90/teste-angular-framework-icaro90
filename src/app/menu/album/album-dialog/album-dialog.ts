import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/utils/interface/user-interface';
import { Album } from '../../../utils/interface/album-interface';

/**
 * @title Dialog elements
 */
@Component({
    selector: 'album-dialog',
    templateUrl: 'album-dialog.html',
})

export class AlbumDialog implements OnInit, OnDestroy {
    formEntity: FormGroup;
    users: User;
    constructor(
        public dialogRef: MatDialogRef<AlbumDialog>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    ) {

    }
    ngOnInit(): void {
        this.users = this._data.users;
        this.createFormClean();

        if (this._data.album) {
            this.loadSelectedForm(this._data.album);
        }
    }
    ngOnDestroy(): void {

    }

    createFormClean(): void {
        this.formEntity = this._formBuilder.group({
            id: [null],
            title: ['', Validators.required],
            userId: [null]
        });
        this.formEntity.clearValidators();
        this.formEntity.updateValueAndValidity();
        this.formEntity.reset();
    }

    loadSelectedForm(data: Album): void {
        this.formEntity = this._formBuilder.group({
            id: [data.id],
            title: [data.title],
            userId: [data.userId]
        });
    }

    saveEntity(): void {
        if (this.formEntity.invalid) {
            return;
        }
        this.dialogRef.close(this.formEntity.value);
    }
}