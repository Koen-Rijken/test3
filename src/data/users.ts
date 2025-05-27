import { User } from '../types';

export const users: User[] = [
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
    name: 'Klaas Rijken',
    email: 'koen.rijken@mail.de',
    role: 'user'
  }
];

export const getUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};