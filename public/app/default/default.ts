import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { ChatService } from './chat.service';

declare var io: any;

@Component({
    selector: 'default',
    templateUrl: 'app/default/default.html',
    providers: [ ChatService, HTTP_PROVIDERS ]
})
export class DefaultPageComponent implements OnInit {
    messages: Array<String>;
    chatBox: String;
    socket: any;
    
    constructor( private chatService: ChatService) {
        this.messages = [];
    }

    ngOnInit () {
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