import {Directive, ElementRef, Inject, Input, OnChanges, SimpleChange} from '@angular/core';

@Directive({
    selector: '[focus]'
})
export class FocusDirective implements OnChanges {
    @Input()
    focus: boolean;

    constructor(@Inject(ElementRef) private element: ElementRef) {
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        changes['focus'].currentValue ? this.element.nativeElement.focus() : this.element.nativeElement.blur();
    }
}