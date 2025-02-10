import { Node } from "./family-tree.model";

const Tarabai: Node = {
  firstName: 'Tarabai',
  gender: 'FEMALE',
  dateOfBirth: new Date('00/00/0000'),
  married: true,
  children: []
}

const Radhika: Node = {
  firstName: 'Radhika',
  gender: 'FEMALE',
  dateOfBirth: new Date('00/00/0000'),
  dateOfDeath: new Date('24/03/2024'),
  married: true,
  children: []
};
const Sheelabai: Node = {
  firstName: 'Sheelabai',
  gender: 'FEMALE',
  dateOfBirth: new Date('00/00/0000'),
  married: true,
  children: [
    Radhika
  ]
}

const Amol: Node = {
  firstName: 'Amol',
  gender: 'MALE',
  dateOfBirth: new Date('00/00/0000'),
  married: true,
  children: []
};
const Vipul: Node = {
  firstName: 'Vipul',
  gender: 'MALE',
  dateOfBirth: new Date('00/00/0000'),
  married: true,
  children: []
};
const Kiran: Node = {
  firstName: 'Kiran',
  gender: 'MALE',
  dateOfBirth: new Date('00/00/0000'),
  married: true,
  children: []
};
const Leelabai: Node = {
  firstName: 'Leelabai',
  gender: 'FEMALE',
  dateOfBirth: new Date('00/00/0000'),
  married: true,
  children: [
    Amol,
    Vipul,
    Kiran
  ]
}

const Nikita: Node = {
  firstName: 'Nikita',
  gender: 'FEMALE',
  dateOfBirth: new Date('22/04/1992'),
  married: true,
  children: []
};
const sandeep: Node = {
  firstName: 'Sandeep',
  gender: 'MALE',
  dateOfBirth: new Date('01/11/1992'),
  married: true,
  spouse: [ Nikita ],
  children: []
};
const nilesh: Node = {
  firstName: 'Nilesh',
  gender: 'MALE',
  dateOfBirth: new Date('21/10/1996'),
  married: false,
  children: []
};
const rohit: Node = {
  firstName: 'Rohit',
  gender: 'MALE',
  dateOfBirth: new Date('27/04/1998'),
  married: false,
  children: []
};
const Ranjana: Node = {
  firstName: 'Ranjana',
  gender: 'FEMALE',
  dateOfBirth: new Date('22/03/1972'),
  married: true,
  children: [
    sandeep,
    nilesh,
    rohit
  ]
}
const Babasaheb: Node = {
  firstName: 'Babasaheb',
  gender: 'MALE',
  dateOfBirth: new Date('02/01/1968'),
  married: true,
  spouse: [ Ranjana ],
  children: [
    sandeep,
    nilesh,
    rohit
  ]
};

const Shweta: Node = {
  firstName: 'Shweta',
  gender: 'FEMALE',
  dateOfBirth: new Date('22/04/1998'),
  married: false,
  children: []
};
const Ankita: Node = {
  firstName: 'Ankita',
  gender: 'FEMALE',
  dateOfBirth: new Date('21/10/1999'),
  married: false,
  children: []
};
const Devrushi: Node = {
  firstName: 'Devrushi',
  gender: 'MALE',
  dateOfBirth: new Date('00/00/0000'),
  married: false,
  children: []
};
const Jyoti: Node = {
  firstName: 'Jyoti',
  gender: 'FEMALE',
  dateOfBirth: new Date('22/03/1972'),
  married: true,
  children: [
    Shweta,
    Ankita,
    Devrushi
  ]
}
const Arun: Node = {
  firstName: 'Arun',
  gender: 'MALE',
  dateOfBirth: new Date('00/00/1968'),
  married: true,
  spouse: [ Jyoti ],
  children: [
    Shweta,
    Ankita,
    Devrushi
  ]
};

const Abhishek: Node = {
  firstName: 'Abhishek',
  gender: 'MALE',
  dateOfBirth: new Date('00/00/0000'),
  married: false,
  children: []
};
const Prerana: Node = {
  firstName: 'Prerana',
  gender: 'FEMALE',
  dateOfBirth: new Date('21/10/1999'),
  married: false,
  children: []
};
const Basanta: Node = {
  firstName: 'Basanta',
  gender: 'FEMALE',
  dateOfBirth: new Date('00/00/0000'),
  married: true,
  children: [
    Abhishek,
    Prerana
  ]
}
const Dashrarth: Node = {
  firstName: 'Dashrarth',
  gender: 'MALE',
  dateOfBirth: new Date('00/00/1968'),
  married: true,
  spouse: [ Basanta ],
  children: [
    Abhishek,
    Prerana
  ]
};

const Pushpabai: Node = {
  firstName: 'Pushpabai',
  gender: 'FEMALE',
  dateOfBirth: new Date('00/00/0000'),
  married: true,
  children: []
}

const Rahibai: Node = {
  firstName: 'Rahibai',
  gender: 'FEMALE',
  dateOfBirth: new Date('00/00/0000'),
  dateOfDeath: new Date('00/00/0000'),
  married: true,
  children: [
    sandeep,
    nilesh,
    rohit
  ]
}
const Sojrabai: Node = {
  firstName: 'Sojrabai',
  gender: 'FEMALE',
  dateOfBirth: new Date('00/00/0000'),
  married: true,
  children: [
    sandeep,
    nilesh,
    rohit
  ]
}
export const Waman: Node = {
  firstName: 'Waman',
  gender: 'MALE',
  dateOfBirth: new Date('00/00/1941'),
  dateOfDeath: new Date('00/00/1995'),
  married: true,
  spouse: [
    Rahibai
  ],
  children: [
    Tarabai,
    Sheelabai,
    Babasaheb,
    Leelabai,
    Arun,
    Dashrarth,
    Pushpabai
  ]
}

export const Vansabai: Node = {
  firstName: 'Vansabai',
  gender: 'FEMALE',
  dateOfBirth: new Date(),
  married: true,
  children: []
};

export const Purnabai: Node = {
  firstName: 'Purnabai',
  gender: 'FEMALE',
  dateOfBirth: new Date(),
  married: true,
  children: []
};

export const Arjun: Node = {
  firstName: 'Arjun',
  gender: 'MALE',
  dateOfBirth: new Date(),
  dateOfDeath: new Date(),
  married: true,
  children: [
    Waman,
    Vansabai,
    Purnabai
  ]
};