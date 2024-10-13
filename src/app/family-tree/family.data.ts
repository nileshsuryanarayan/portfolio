import { Gender, TreeNode } from "./family-node.model";

export const DUMMY_TREE: TreeNode[] = [
    {
      name: 'CEO',
      color: 'level-1',
      gender: Gender.MALE,
      spouse: 'CEO Spouse',
      children: [
        {
          name: 'Director A',
          color: 'level-2',
          gender: Gender.MALE,
          children: [
            {
              name: 'Manager A',
              color: 'level-3',
              gender: Gender.FEMALE,
              children: [
                { name: 'Person A', gender: Gender.MALE },
                { name: 'Person B', gender: Gender.FEMALE },
                { name: 'Person C', gender: Gender.MALE },
                { name: 'Person D', gender: Gender.FEMALE },
              ],
            },
            {
              name: 'Manager B',
              color: 'level-3',
              gender: Gender.MALE,
              children: [
                { name: 'Person A', gender: Gender.MALE },
                { name: 'Person B', gender: Gender.FEMALE },
                { name: 'Person C', gender: Gender.MALE },
                { name: 'Person D', gender: Gender.FEMALE },
              ],
            },
          ],
        },
        {
          name: 'Director B',
          color: 'level-2',
          gender: Gender.FEMALE,
          children: [
            {
              name: 'Manager C',
              color: 'level-3',
              gender: Gender.FEMALE,
              children: [
                { name: 'Person A', gender: Gender.MALE },
                { name: 'Person B', gender: Gender.FEMALE },
                { name: 'Person C', gender: Gender.MALE },
                { name: 'Person D', gender: Gender.FEMALE },
              ],
            },
            {
              name: 'Manager D',
              color: 'level-3',
              gender: Gender.MALE,
              children: [
                { name: 'Person A', gender: Gender.MALE },
                { name: 'Person B', gender: Gender.FEMALE },
                { name: 'Person C', gender: Gender.MALE },
                { name: 'Person D', gender: Gender.FEMALE },
              ],
            },
          ],
        },
      ],
    },
  ];
