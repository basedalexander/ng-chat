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
        this.fetchMessages()
            .subscribe((success) => {
                let data = success.json();
                
                let dataLen = data.length,
                    i;

                for(i = 0; i < dataLen; i++) {
                    this.messages.push(data[i].message);
                }
            },
            this.onMessagesFetchedError);

        this.clearChatBox();
        this.socket = io();
        this.socket.on("chat_message", (msg) => {
            this.messages.push(msg.message);
        });
    }

    fetchMessages () {
        return this.chatService.fetchMessages();
    }

    onMessagesFetchedError (error): void {
        console.log(JSON.stringify(error));
    }

    sendMessage (msg) {
        this.socket.emit("chat_message", { message: msg });
        this.clearChatBox();
    }

    clearChatBox () {
        this.chatBox = "";
    }
}