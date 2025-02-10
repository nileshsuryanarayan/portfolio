export class Node {
    id?: number;
    isRoot?: boolean;
    firstName: string;
    lastName?: string;
    gender: 'MALE' | 'FEMALE';
    dateOfBirth: Date;
    dateOfDeath?: Date;
    married: boolean;
    father?: Node;
    fatherId?: string;
    mother?: Node;
    motherId?: string;
    spouse?: Node[];
    spouseIds?: string[];
    children: Node[];
    childrenIds?: string[];

    constructor(firstName: string, gender: 'MALE' | 'FEMALE', dateOfBirth: Date, isMarried: boolean, spouse?: Node[]) {
        this.firstName = firstName;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.married = isMarried;
        this.children = [];
        if (spouse) {
            this.spouse = spouse;
        }
    }
}
  
export class Tree {
    rootNode: Node;
  
    constructor(rootNode: Node) {
      this.rootNode = rootNode;
    }
}