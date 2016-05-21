"use strict";
var router_1 = require('@angular/router');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_component_1 = require('./app.component');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    router_1.ROUTER_PROVIDERS
])
    .then(function (success) { return console.log('AppComponent bootstrapped!'); }, function (error) { return console.error(error); });
//# sourceMappingURL=main.js.map