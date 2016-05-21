import { Http } from '@angular/http';

export class ChatService {
    constructor( private http: Http ) { }

    fetchMessages () {
        return this.http.get('/fetch');
    }
}