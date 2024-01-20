import { Directive, HostListener } from "@angular/core";

@Directive({
    selector: '[mousePosition]'
})
export class MousePositionDirective {

    @HostListener('mousemove', ['$event']) onMouseMove(event: any) {
        console.log('Mouse position: ', `${event.clientX} - ${event.clientY}`);
    }

}
