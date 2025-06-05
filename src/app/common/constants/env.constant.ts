import { environment } from "src/environments/environment";

export const API = {
    FAMILY_TREE: environment.familyTreeBasePath
};

export const AUTH = {
    USERNAME: 'sandeep',
    PASSWORD: 'test123'
};

export const ENDPOINTS = {
    GET_FAMILY_DATA: '/family-members',
    UPDATE_FAMILY_MEMBER: '/update-family-member'
};