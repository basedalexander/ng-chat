import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';

import { ChatComponent } from './chat.component';

@Component({
    selector: 'app-component',
    template: `
    <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES]
})
@Routes([
    {
        path: '/app',
        component: ChatComponent
    },
    {
        path: '*',
        component: ChatComponent
    },
])

export class AppComponent {
    constructor(private router: Router) {

    }
}