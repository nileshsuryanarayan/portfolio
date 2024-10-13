export interface Node {
    name: string;
    dateOfBirth: string;
    dateOfDeath?: string;
    isMarried: boolean;
    father: Node | null;
    mother: Node | null;
    spouse?: Node | null;
    children: Node[];
}