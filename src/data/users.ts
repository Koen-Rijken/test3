import { User } from '../types';

let users: User[] = [
  {
    id: '1',
    name: 'Koen Rijken',
    email: 'koen.rijken@tribe.land',
    role: 'admin'
  },
  {
    id: '2',
    name: 'Peter Brandner',
    email: 'peter.brandner@tribe.land',
    role: 'admin'
  },
  {
    id: '3',
    name: 'Stefan Ebner',
    email: 'stefan.ebner@tribe.land',
    role: 'admin'
  },
  {
    id: '4',
    name: 'Christian Schemoschek',
    email: 'christian.schemoschek@tribe.land',
    role: 'admin'
  },
  {
    id: '5',
    name: 'John Rijken',
    email: 'john.rijken@me.com',
    role: 'user'
  },
  {
    id: '6',
    name: 'Klaas Rijken',
    email: 'koen.rijken@mail.de',
    role: 'user'
  }
];

export const getUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};

export const addUser = (user: Omit<User, 'id'>): User => {
  const maxId = Math.max(...users.map(u => parseInt(u.id)));
  const newUser = {
    ...user,
    id: (maxId + 1).toString()
  };
  
  users = [...users, newUser];
  return newUser;
};

export { users };