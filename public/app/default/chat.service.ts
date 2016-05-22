import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

// Include all the operators at once
import {Observable} from 'rxjs/Rx';

// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/share';
// import 'rxjs/add/operator/catch';

@Injectable()
export class ChatService {
    constructor( private http: Http ) { }

    fetchMessages () {
        return this.http.get('/fetch')
                .map((response: Response) => response.json())
                .catch(this.handleError);
                    
    }
    
    handleError (error: Response ) {
        return Observable.throw(error.json().error || 'Server error');
    }
}