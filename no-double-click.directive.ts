import { Directive, HostListener, HostBinding, ElementRef, Renderer2 } from '@angular/core';
/**
 * @author yhauxell@gmail.com
 */
@Directive({
    selector: '[noDblClick]'
})
export class NoDblClickDirective {

    constructor(private el: ElementRef,
        private renderer: Renderer2) {
    }


    @HostListener('click')
    clickEvent() {
        const _this_ = this;
        const el = this.el.nativeElement;
        this.renderer.setAttribute(el, 'disabled', 'disabled');
        setTimeout(function () {
            _this_.renderer.removeAttribute(el, 'disabled');
        }, 500);
    }

}