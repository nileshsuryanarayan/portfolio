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
    brief: boolean = true;

    normalClass = 'grid template-wrapper';
    
    defaultEditModeClass = 'grid-12 grid';
    printPreviewClass = 'grid template-1-style gen-style';
    editOrPrintClass = this.defaultEditModeClass;

    @ViewChild('printPreview', { static: false }) elem!: ElementRef;

    constructor(
        public service: ResumeComponentService
    ) {}

    ngOnInit(): void {
        
    }

    printPdf() {
        console.log('Page to be printed called...');
        this.service.hidePencilIcon();

        this.printPreStyle();

        let pdfContent = new jsPDF('p', 'px', [1042, 795]); // [297, 210] - [842, 595]
        pdfContent.html(this.elem.nativeElement, {
            callback: (pdfContent) => {
                pdfContent.save('Resume.pdf');
                this.resetPageView();
            }
        });
    }

    printPreStyle() {
        // Adjust the margin
        let genTemplates: HTMLElement[] = Array.from(document.getElementsByClassName('gen-style') as HTMLCollectionOf<Element>) as HTMLElement[];
        genTemplates.forEach(elem => {
            elem.style.marginTop = '0';
            elem.style.marginBottom = '0';
        });

        // Adjust the profile name size
        let profileNameLbl: HTMLElement = document.getElementById('profileName') as HTMLElement;
        profileNameLbl.style.fontSize = '28px';
    }

    resetPageView() {
        this.value = 0;
        this.isPreview = false;
        this.brief = true;
        this.editOrPrintClass = this.defaultEditModeClass;
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

    showPrintPreview() {
        this.isPreview = true;
        this.service.hidePencilIcon();
        this.normalClass = 'grid template-1-style';
        this.editOrPrintClass = this.printPreviewClass;
    }

    displayBrief() {
        console.log('DisplayBrief clicked...');
        let elem = document.getElementById('left-panel');
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