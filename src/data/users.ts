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
    name: 'Klaas Rijken',
    email: 'koen.rijken@mail.de',
    role: 'user'
  }
];

export const getUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};