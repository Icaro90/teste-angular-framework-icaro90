import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

/**
 * @title Dialog elements
 */
@Component({
    selector: 'dialog-confirm',
    templateUrl: 'dialog-confirm.html',
})

export class DialogConfirm {
    public confirmMessage: string;

    constructor(
        public dialogRef: MatDialogRef<DialogConfirm>,
    ) {
    }

}