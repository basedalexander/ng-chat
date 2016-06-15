import {Directive, TemplateRef, ViewContainerRef, Input} from '@angular/core';

@Directive({
    selector: '[myUnless]'
})
export class MyUnlessDirective {
    constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef){
    }

    @Input() set myUnless(val: boolean) {
        if (val !== true) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
        else {
            this.viewContainerRef.clear();
        }
    }
}