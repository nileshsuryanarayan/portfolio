import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UtilityService {
    
    /**
     * Returns a deep copy of the provided object.
     * 
     * @param {T} obj - The object to be copied.
     * @returns {T} A deep copy of the provided object.
     */
    public deepCopy<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj));
    }

    /** 
    * Checks if the provided string is empty.
    * 
    * @param {string} str - The string to be checked.
    * @returns {boolean} True if the string is empty, false otherwise.
    */
    public isStringEmpty(str: string): boolean {
        return str === null || str === undefined || str.trim() === '';
    }

    /**
     * Checks if the provided string is a valid date string.
     * 
     * @param {string} dateStr - The date string to be checked.
     * @returns {boolean} True if the date string is valid, false otherwise.
     */
    public isDateStrValid(dateStr: string): boolean {
        return !isNaN(Date.parse(dateStr));
    }

    /**
     * Checks if the provided date is valid.
     * @param date  The date to be checked.
     * @returns True if the date is valid, false otherwise.
     */
    public isDateValid(date: Date): boolean {
        return date instanceof Date && !isNaN(date.getTime());
    }
}
