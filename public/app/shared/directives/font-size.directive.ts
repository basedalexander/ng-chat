import { Directive, ElementRef } from '@angular/core';

@Directive({
   selector: '[fontSize]',
   host: {
     '(mouseenter)': 'onMouseEnter()',
     '(mouseleave)': 'onMouseLeave()'
   }
})
export class FontSizeDirective {

    constructor(private elRef: ElementRef) {
    }
    
    onMouseEnter(): void {
        this.elRef.nativeElement.style.backgroundColor = 'green';
    }
    
    onMouseLeave(): void {
        this.elRef.nativeElement.style.backgroundColor = 'blue';
    }
    
}
