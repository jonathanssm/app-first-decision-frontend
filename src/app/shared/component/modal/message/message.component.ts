import {Component, EventEmitter, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})
export class MessageComponent {

    public eventConfirmation = new EventEmitter<any>();

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<MessageComponent>) {
    }

    emitEventConfirmation(event: Event): void {
        this.eventConfirmation.emit(event);
        this.dialogRef.close();
    }

}
