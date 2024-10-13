// export interface TreeNode {
//     id: number;
//     name: string;
//     children?: TreeNode[];
//     expanded?: boolean; // New property to track node state
// }

export interface TreeNode {
    name: string;
    color?: string;
    gender: Gender;
    spouse?: string;
    children?: TreeNode[];
}

export enum Gender {
    MALE,
    FEMALE
};
