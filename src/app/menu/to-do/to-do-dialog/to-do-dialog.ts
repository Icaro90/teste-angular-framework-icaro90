import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToDoComponent } from '../to-do.component';
import { Todo } from '../../../utils/interface/to-do-interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/utils/interface/user-interface';

/**
 * @title Dialog elements
 */
@Component({
    selector: 'to-do-dialog',
    templateUrl: 'to-do-dialog.html',
})

export class ToDoDialog implements OnInit, OnDestroy {
    formEntity: FormGroup;
    users: User;

    constructor(
        public dialogRef: MatDialogRef<ToDoComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    ) {

    }
    ngOnInit(): void {
        this.users = this._data.users;
        this.createFormClean();
        if (this._data.todo) {
            this.loadSelectedForm(this._data.todo);
        }
    }
    ngOnDestroy(): void {

    }

    createFormClean(): void {
        this.formEntity = this._formBuilder.group({
            id: [null],
            title: ['', Validators.required],
            userId: [null],
            completed: [false]
        });
        this.formEntity.clearValidators();
        this.formEntity.updateValueAndValidity();
        this.formEntity.reset();
    }

    loadSelectedForm(data: Todo): void {
        this.formEntity = this._formBuilder.group({
            id: [data.id],
            title: [data.title],
            userId: [data.userId],
            completed: [data.completed]
        });
    }

    saveEntity(): void {
        if (this.formEntity.invalid) {
            return;
        }
        this.dialogRef.close(this.formEntity.value);
    }

}