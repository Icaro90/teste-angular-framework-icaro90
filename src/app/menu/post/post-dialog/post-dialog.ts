import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/app/utils/interface/post-interface';
import { User } from 'src/app/utils/interface/user-interface';
/**
 * @title Dialog elements
 */
@Component({
    selector: 'post-dialog',
    templateUrl: 'post-dialog.html',
})

export class PostDialog implements OnInit, OnDestroy {
    formEntity: FormGroup;
    users: User;

    constructor(
        public dialogRef: MatDialogRef<PostDialog>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    ) {

    }
    ngOnInit(): void {
        this.users = this._data.users;
        this.createFormClean();

        if (this._data.post) {
            this.loadSelectedForm(this._data.post);
        }

    }
    ngOnDestroy(): void {

    }

    createFormClean(): void {
        this.formEntity = this._formBuilder.group({
            id: [null],
            title: ['', Validators.required],
            userId: [null],
            body: ['', Validators.required],
        });
        this.formEntity.clearValidators();
        this.formEntity.updateValueAndValidity();
        this.formEntity.reset();
    }

    loadSelectedForm(data: Post): void {
        this.formEntity = this._formBuilder.group({
            id: [data.id],
            title: [data.title],
            userId: [data.userId],
            body: [data.body]
        });
    }

    saveEntity(): void {
        if (this.formEntity.invalid) {
            return;
        }
        this.dialogRef.close(this.formEntity.value);
    }
}