import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MessageComponent} from "./message/message.component";

@Injectable()
export class ModalService {

    constructor(private dialog: MatDialog) {
    }

    showMessage(message: string): void {
        this.configModalMessage(message);
    }

    private show(message: string, modalComponent: any): MatDialogRef<any> {
        return this.dialog.open(modalComponent, {
            disableClose: true,
            position: {top: '100px'},
            maxWidth: '95vw',
            maxHeight: '50vw',
            data: {message: `${message}`}
        });
    }

    private configModalMessage(message: string): void {
        this.show(message, MessageComponent);
    }

}
