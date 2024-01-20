import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { ResumeComponentService } from "../resume-components/resume-components.service";
import jsPDF from 'jspdf';

@Component({
    selector: 'template-1',
    templateUrl: './template.component.html',
    styleUrls: [ './template.component.scss', './template.preview.scss', './template.phone.preview.scss' ]
})
export class TemplateComponent implements OnInit {

    value: number = 0;

    isPreview: boolean = false;

    normalClass = 'grid template-wrapper';

    @ViewChild('printPreview', { static: false }) elem!: ElementRef;

    constructor(
        public service: ResumeComponentService
    ) {}

    ngOnInit(): void {
        
    }

    printPdf() {
        console.log('Page to be printed called...');
        this.service.hidePencilIcon();
        
        let pdfContent = new jsPDF('p', 'px', [842, 595]); // [297, 210]
        pdfContent.html(this.elem.nativeElement, {
            callback: (pdfContent) => {
                pdfContent.save('Resume.pdf');
            }
        });
    }

    edit() {
        
    }

    collapse() {
        let leftElement: HTMLElement = document.getElementById('right-window') as HTMLElement;
        leftElement.style.gridTemplateColumns = '1 / span 12';
        leftElement.style.gridColumn = '1 / span 12';
        leftElement.style.display = 'inline-block';
        // leftElement.style.width = 'fit-content';

        let rightElement: HTMLElement = document.getElementById('left-panel') as HTMLElement;
        rightElement.style.display = 'none';
    }

    printPreview() {
        this.isPreview = true;
        this.service.hidePencilIcon();
        this.normalClass = 'grid template-1-style';
    }

}