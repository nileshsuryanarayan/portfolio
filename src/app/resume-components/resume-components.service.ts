import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ResumeComponentService {

    pencilIcon: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    constructor() {}

    public showPencilIcon() {
        this.pencilIcon.next(true);
    }

    public hidePencilIcon() {
        this.pencilIcon.next(false);
    }

}
