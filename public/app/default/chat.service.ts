import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ChatService {
    constructor( private http: Http ) { }

    fetchMessages () {
        return this.http.get('/fetch');
    }
}