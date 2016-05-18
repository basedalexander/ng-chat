import { Component } from '@angular/core';
import { bootstrap }    from '@angular/platform-browser-dynamic';

import { AppComponent }    from './app.component';

@Component({
    selector: 'my-app',
    template: `<app-component>Loading ...</app-component>`,
    directives: [AppComponent]
})
export class MyApp {
}

bootstrap(MyApp);