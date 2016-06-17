import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { UserCredentialsType } from './modal/modal.component';

import { ChatService } from './chat.service';

import { ModalComponent } from './modal/modal.component';

declare var io: any;

@Component({
    selector: 'default',
    template: `
    <modal-demo (submitted)="onSubmitted($event)"></modal-demo>
    <div class="main">
        <ul id="messages">
            <li *ngFor="let message of messages">[{{message.created_at}}] {{message.message}} </li>
        </ul>
    </div>
    
    <div class="sidebar">
        
    </div>
    
    <div class="chatbox">
        <form action="">
            <input #chatbox
                [(ngModel)]='chatBox'
                autocomplete="off"
                type="text"/>
            
            <button (click)="sendMessage(chatbox.value)">Send</button>
        </form>
    </div>

    `,
    styles: [`
    .main {
        float: left;
        width: 80%;
    }
    
    .sidebar {
        float: right;
        width: 20%;
        height: 300px;
        border: 2px solid dodgerblue;
    }
        
    .chatbox {
        clear: both;
    }
    `],
    providers: [ ChatService, HTTP_PROVIDERS ],
    directives: [ModalComponent]
})
export class DefaultPageComponent {
    messages: Array<String>;
    chatBox: String;
    socket: any;

    constructor( private chatService: ChatService) {
        this.messages = [];
    }

    private init(): void {
        this.getMessages();
        this.clearChatBox();

        this.socket = io();
        this.socket.on("chat_message", (message) => {
            this.appendMessage(message);
        });
    }

    private getMessages() {
        this.fetchMessages()
            .subscribe(messages => {
                    messages.forEach(message =>  {
                        this.appendMessage(message);
                    });
                },
                this.onMessagesFetchedError
            );
    }
    private fetchMessages () {
        return this.chatService.fetchMessages();
    }
    private appendMessage(message: any) {
        this.messages.push(message);
    }

    private onMessagesFetchedError (error): void {
        console.log(error);
    }

    private sendMessage (msg): void {
        this.socket.emit("chat_message", { message: msg });
        this.clearChatBox();
    }

    private clearChatBox (): void {
        this.chatBox = "";
    }

    private onSubmitted(event: UserCredentialsType): void {
        console.log(`brat submitted the form ${event.email} ${event.password}`);
        this.init();
    }
}
