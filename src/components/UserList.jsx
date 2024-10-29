import React, { useState, useEffect } from 'react';
import UserDetails from './UserDetails';
import UserForm from './UserForm';
import { useTheme } from '../context/ThemeContext';
import defaultUserData from './userData';
import styles from '../styles/UserList.module.scss';

function UserList() {
  const { themeStyles } = useTheme();

  const initialUsers = JSON.parse(localStorage.getItem('users')) || defaultUserData;
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const updateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.login.uuid === updatedUser.login.uuid ? updatedUser : user
    );
    setUsers(updatedUsers);
    setSelectedUser(updatedUser);
  };

  return (
    <div className={styles.container} style={{ backgroundColor: themeStyles.cardBackground, color: themeStyles.color }}>
      <h2 className={styles.heading}>User List</h2>
      
      <div className={styles.userGrid}>
        {users.map((user) => (
          <div
            key={user.login.uuid}
            onClick={() => setSelectedUser(user)}
            className={styles.userCard}
            style={{ backgroundColor: themeStyles.cardBackground, color: themeStyles.color }}
          >
            <img
              src={user.picture.large}
              alt={`${user.name.first} ${user.name.last}`}
              className={styles.userImage}
            />
            <p className={styles.userName}>{user.name.first} {user.name.last}</p>
            <p>{user.location.city}, {user.location.country}</p>
          </div>
        ))}
      </div>

      {selectedUser && (
        <>
          <UserDetails user={selectedUser} />
          <UserForm user={selectedUser} updateUser={updateUser} />
        </>
      )}
    </div>
  );
}

export default UserList;
