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
    
    getMessages() {
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

    fetchMessages () {
        return this.chatService.fetchMessages();
    }

    onMessagesFetchedError (error): void {
        console.log(error);
    }

    sendMessage (msg) {
        this.socket.emit("chat_message", { message: msg });
        this.clearChatBox();
    }

    clearChatBox () {
        this.chatBox = "";
    }
}