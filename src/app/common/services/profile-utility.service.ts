import { Injectable } from "@angular/core";
import * as profile from '../../../assets/profile.json';

@Injectable({
    providedIn: 'root'
})
export class ProfileUtilityService {

    private profileJsonPath = '';

    constructor() {}

    public getProfileJson() {
        console.log('Profile JSON:', profile);
        return profile;
    }

}
