import { Route, Routes, Navigate } from 'react-router-dom';

import { USERS } from 'Utils/router-helpers';

import Users from '../UserTable';

const Container = () => (
  <Routes>
    <Route path={USERS} element={<Users />} end />
    <Route path="*" element={<Navigate to={USERS} replace />} />
  </Routes>
);

export default Container;
