import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Node, Tree } from "./family-tree.model";

/**
 * Interface representing the restructured family data.
 */
export interface RestructuredFamilyData {
    tree: Tree;
    map: Map<number, Node>;
}

@Injectable({
    providedIn: 'root'
})
export class FamilyTreeService {

    constructor(
        private http: HttpClient
    ) {}

    /**
     * Fetches family data from the API.
     * 
     * @returns {Observable<Node[]>} An observable that emits an array of Node objects.
     */
    public getFamilyData(): Observable<Node[]> {
        const username = 'sandeep';
        const password = 'test123';

        const authHeader = 'Basic ' + btoa(username + ':' + password);
        const headers = new HttpHeaders().set('Authorization', authHeader);

        return this.http.get<Node[]>('http://localhost:8080/suryanarayan-family-tree-api/family-members', { headers });
    }

    /**
     * Restructures a flat list of nodes into a tree structure.
     * 
     * @param {Node[]} nodes - An array of Node objects to be restructured.
     * @returns {Tree} A Tree object representing the restructured family data.
     */
    public restructure(nodes: Node[]): RestructuredFamilyData {
        let familyMap: Map<number, Node> = new Map<number, Node>();
        for(let obj of nodes) {
            var id = obj.id;
            familyMap.set(id, obj);
        }
        let tree: Tree;
        
        // Below loop
        // Do not refer Parents, only refer children
        // If male and married, refer spouse/s
        for(let obj of nodes) {
            if(obj.childrenIds && obj.childrenIds.length > 0) {
                obj.children = [];
                for(let i=0; i < obj.childrenIds.length; i++) {
                    // obj.children[i] = familyMap.get(+obj.childrenIds[i]);
                    if(+obj.childrenIds[i] >= 0) {
                        obj.children[i] = familyMap.get(+obj.childrenIds[i]);
                    }
                }
            }

            if(obj.married && obj.spouseIds != null && obj.spouseIds.length > 0) {
                obj.spouse = [];
                for(let i=0; i < obj.spouseIds.length; i++) {
                    if(+obj.spouseIds[i] >= 0) {
                        obj.spouse[i] = familyMap.get(+obj.spouseIds[i]);
                    }
                }
            }
        }
        for(let node of nodes) {
            if(node.isRoot) {
                tree = new Tree(node);
            }
        }

        let familyData: RestructuredFamilyData = {
            tree,
            map: familyMap
        };

        return familyData;
    }

    public filterMales(nodes: Node[]): Node[] {
        let males: Node[] = [];
        nodes.forEach(node => {
            if(node.gender === 'MALE') {
                males.push(node);
            }
        });
        return males;
    }

    public filterFemales(nodes: Node[]): Node[] {
        let females: Node[] = [];
        nodes.forEach(node => {
            if(node.gender === 'FEMALE') {
                females.push(node);
            }
        });
        return females;
    }

}
