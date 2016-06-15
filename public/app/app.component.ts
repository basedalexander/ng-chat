import { Component } from '@angular/core';

import { DefaultPageComponent } from './default/default';

@Component({
    selector: 'app-component',
    template: `<default></default>`,
    directives: [ DefaultPageComponent ]
})
export class AppComponent {
}
