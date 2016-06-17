import {Component, ViewContainerRef} from '@angular/core';

import { DefaultPageComponent } from './default/default';

@Component({
    selector: 'app-component',
    template: `<default></default>`,
    directives: [ DefaultPageComponent ]
})
export class AppComponent {

    constructor(private viewContainerRef: ViewContainerRef) {
        // You need this small hack in order to catch application root view container ref
        this.viewContainerRef = viewContainerRef;
    }
}
