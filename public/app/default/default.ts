import {Component, OnInit} from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { ChatService } from './chat.service';
declare var io: any;

@Component({
    selector: 'default',
    template: `
    <ul id="messages">
        <li *ngFor="let message of messages">{{message}}</li>
    </ul>
    <form action="">
        <input #chatbox [(ngModel)]='chatBox' autocomplete="off" type="text" (keyup)="0"/>
        
        <button (click)="sendMessage(chatbox.value)">Send</button>
    </form>
    `,
    providers: [ ChatService, HTTP_PROVIDERS ]
})
export class DefaultPageComponent implements OnInit {
    messages: Array<String>;
    chatBox: String;
    socket: any;

    constructor( private chatService: ChatService) {
        this.messages = [];
    }

    ngOnInit(): void {
        this.init();
    }

    private init(): void {
        this.getMessages();
        this.clearChatBox();

        this.socket = io();
        this.socket.on("chat_message", (msg) => {
            this.messages.push(msg.message);
        });
    }

    private getMessages() {
        this.fetchMessages()
            .subscribe(
                messages => {
                    messages.forEach(message =>  {
                        this.messages.push(message.message);
                    });
                },
                this.onMessagesFetchedError
            );
    }

    private fetchMessages () {
        return this.chatService.fetchMessages();
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
}
