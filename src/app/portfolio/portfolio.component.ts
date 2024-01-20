import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from "@angular/core";
import { ProfileUtilityService } from "../common/services/profile-utility.service";

@Component({
    selector: 'portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: [ './portfolio.component.scss', './portfolio.component.phone.scss' ]
})
export class PortfolioComponent implements OnInit, AfterViewInit {
    title = 'portfolio';

    profile: any;

    @ViewChild('torchElem') torch: ElementRef;

    constructor(
        private profileUtil: ProfileUtilityService,
        private renderer: Renderer2
        ) {}

    brief: boolean = true;
    openedLink: string = 'opened-link point';
    closedLink: string = 'closed-link point';
    linkStyles: string[] = [ this.closedLink, this.closedLink, this.closedLink, this.closedLink, this.closedLink, this.closedLink ];

    @HostListener('mousemove', ['$event']) onMouseMove(event: any) {
        this.renderer.setStyle(this.torch.nativeElement, 'top', `${event.clientY}px`);
        this.renderer.setStyle(this.torch.nativeElement, 'left', `${event.clientX}px`);
    }

    ngOnInit(): void {
        this.profile = this.profileUtil.getProfileJson();
    }

    ngAfterViewInit(): void {
        console.log('PORTFOLIO AfterViewInit: ', this.torch);
    }

    toggleLink(index: number) {
        this.linkStyles.forEach((elem, index) => { this.linkStyles[index] = this.closedLink });
        this.linkStyles[index] = this.openedLink;
    }

    initialize() {
        // this.linkStyles.forEach((elem, index) => { this.linkStyles[index] = this.closedLink });
    }

    displayBrief() {
        let elem = document.getElementById('left-view');
        if (elem !== null) {
        // true, then display block
        if (this.brief)
            elem.style.display = 'block';
        else
            elem.style.display = 'none';
        this.brief = !this.brief;
        }
    }
}
