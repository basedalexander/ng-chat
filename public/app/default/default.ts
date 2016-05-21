import { Component, OnInit } from '@angular/core';

import { ChatService } from './chat.service';

declare var io: any;

@Component({
    selector: 'default',
    templateUrl: 'app/default/default.html',
    providers: [ ChatService ]
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
            .subscribe(this.onMessagesFetchedSuccess,
            this.onMessagesFetchedError);

        this.clearChatBox();
        this.socket = io();
        this.socket.on("chat_message", this.onMessageReceived);
    }

    fetchMessages () {
        return this.chatService.fetchMessages();
    }

    onMessagesFetchedSuccess (data): void {
        data = data.json();

        let dataLen = data.length,
            i;

        for(i = 0; i < dataLen; i++) {
            this.messages.push(data[i].message);
        }
    }

    onMessagesFetchedError (error): void {
        console.log(JSON.stringify(error));
    }

    onMessageReceived (msg): void  {
        this.messages.push(msg);
    }

    sendMessage (msg) {
        this.socket.emit("chat_message", msg);
        this.chatBox = "";
    }

    clearChatBox () {
        this.chatBox = "";
    }
}