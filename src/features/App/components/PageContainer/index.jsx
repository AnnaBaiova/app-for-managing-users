import { Route, Routes } from 'react-router-dom';

import UserTable from 'Users/components/UserTable';
import {
  USERS,
} from 'Utils/router-helpers';

import PageLayout from '../PageLayout';
import PageHeader from '../PageHeader';

const PageContainer = () => (
  <>
    <PageHeader />
    <PageLayout>
      <Routes>
        <Route path={`${USERS}/`} element={<UserTable />} />
      </Routes>
    </PageLayout>
  </>
);

export default PageContainer;
