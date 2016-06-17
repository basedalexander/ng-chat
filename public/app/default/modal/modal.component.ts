import { Component , Output, EventEmitter } from '@angular/core';

import {CORE_DIRECTIVES} from '@angular/common';

import { MODAL_DIRECTVES, BS_VIEW_PROVIDERS } from 'ng2-bootstrap/ng2-bootstrap';
import { modalComponentTpl } from './modal.component.tpl';

export type UserCredentialsType = {
    email: string,
    password: any;
}

@Component({
    selector: 'modal-demo',
    template: modalComponentTpl,
    viewProviders: [BS_VIEW_PROVIDERS],
    directives: [MODAL_DIRECTVES, CORE_DIRECTIVES],
    styles: [`
    form {
        position: relative;
        background: none;
    }
    `]
})
export class ModalComponent {

    @Output() submitted: EventEmitter<UserCredentialsType> = new EventEmitter<UserCredentialsType>();

    onSubmitted(): void {
        this.submitted.emit(this.userCredentials);
    }
    
    userCredentials: UserCredentialsType = {
        email: '',
        password: ''
    }
}