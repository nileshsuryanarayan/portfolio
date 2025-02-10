import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Node, Tree } from "./family-tree.model";

@Injectable({
    providedIn: 'root'
})
export class FamilyTreeService {

    constructor(
        private http: HttpClient
    ) {}

    public getFamilyData(): Observable<Node[]> {
        const username = 'sandeep';
        const password = 'test123';

        const authHeader = 'Basic ' + btoa(username + ':' + password);
        const headers = new HttpHeaders().set('Authorization', authHeader);

        return this.http.get<Node[]>('http://localhost:8080/suryanarayan-family-tree-api/family-members', { headers });
    }

    public restructure(nodes: Node[]): Tree {
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
        return tree;
    }

}
