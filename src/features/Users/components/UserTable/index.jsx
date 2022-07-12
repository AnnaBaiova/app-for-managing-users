import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  IconButton,
  Box,
} from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { Edit, Delete, Add } from '@material-ui/icons';

import { actions } from 'Users/redux/ducks';

import { UserShape } from '../../../../shapes/users-shapes';
import ManageUser from '../ManageUser';

const NoRecords = styled(({ className }) => (
  <TableRow>
    <TableCell colSpan={5} className={className}>No records found.</TableCell>
  </TableRow>
))({
  border: 0,
});

const UserTable = ({
  users,
  loading,
  error,
  fetchAllUsers,
  editUser,
  deleteUser,
  addUser,
}) => {
  const [userManageModalOpen, setUserManageModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setUserManageModalOpen(true);
    setIsNewUser(false);
  };

  const handleAddUser = () => {
    setSelectedUser({});
    setUserManageModalOpen(true);
    setIsNewUser(true);
  };

  const userFields = Object.keys(UserShape).filter((item) => item !== 'password');

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {userFields.map((heading) => (
                <TableCell key={JSON.stringify(heading)} align="left" width="auto">
                  <Typography variant="body1">{heading}</Typography>
                </TableCell>
              ))}
              <TableCell align="left" width="auto">
                <Typography variant="body1">Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!users.length && users.filter((item) => item !== 'password').map((row) => (
              <TableRow key={JSON.stringify(row)}>
                {Object.keys(row).filter((item) => item !== 'password').map((field) => (
                  <TableCell key={JSON.stringify(field)} width="auto">{row[field]}</TableCell>
                ))}
                <TableCell width="auto">
                  <IconButton title="Edit User" onClick={() => handleEditUser(row)}>
                    <Edit />
                  </IconButton>
                  <IconButton title="Delete User" onClick={() => deleteUser(row.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {((!loading && !users.length) || error) && <NoRecords />}
          </TableBody>
        </Table>
      </TableContainer>
      <Box>
        <IconButton title="Create new User" onClick={() => handleAddUser()}>
          <Add />
        </IconButton>
      </Box>
      <ManageUser
        open={userManageModalOpen}
        hideModal={() => setUserManageModalOpen(false)}
        selectedUser={selectedUser}
        editUser={editUser}
        users={users}
        isNewUser={isNewUser}
        addUser={addUser}
      />
    </>
  );
};

UserTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape(UserShape)).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  fetchAllUsers: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
};

UserTable.defaultProps = {
  error: false,
  loading: false,
};

const mapStateToProps = ({
  users: { users, error, loading },
}) => ({
  users,
  error,
  loading,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    fetchAllUsers: actions.fetchAllUsers,
    editUser: actions.editUser,
    deleteUser: actions.deleteUser,
    addUser: actions.addUser,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
