import { isEmpty } from 'lodash';
import { userRoles } from '../features/Users/utils/user-helpers';

export const fillStorageFakeData = () => {
  const users = [{
    id: 1,
    email: 'admin@gmail.com',
    firstName: 'admin',
    lastName: 'admin',
    role: userRoles.ADMIN,
    status: 'active',
    password: 'admin123',
  },
  {
    id: 2,
    email: 'doctor@gmail.com',
    firstName: 'doctor',
    lastName: 'doctor',
    role: userRoles.DOCTOR,
    status: 'active',
    password: 'doctor123',
  },
  {
    id: 3,
    email: 'accountant@gmail.com',
    firstName: 'accountant',
    lastName: 'accountant',
    role: userRoles.ACCOUNTANT,
    status: 'active',
    password: 'accountant123',
  }];

  if (isEmpty(JSON.parse(localStorage.getItem('users')))) {
    localStorage.setItem('users', JSON.stringify(users));
  }
};
