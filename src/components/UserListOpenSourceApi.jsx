// src/components/UserList.jsx
import React, { useEffect, useState } from 'react';
import UserDetails from './UserDetails';
import UserForm from './UserForm';
import { useTheme } from '../context/ThemeContext';

function UserList() {
  const { themeStyles } = useTheme();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")
      .then((response) => response.json())
      .then((data) => setUsers(data.results))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div style={{
      backgroundColor: themeStyles.cardBackground,
      color: themeStyles.color,
      padding: "20px",
      borderRadius: "8px",
      marginTop: "20px",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
    }}>
      <h2 style={{ color: themeStyles.color, marginBottom: "20px" }}>User List</h2>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: "15px",
        listStyleType: "none",
        padding: 0
      }}>
        {users.map((user) => (
          <div
            key={user.login.uuid}
            onClick={() => setSelectedUser(user)}
            style={{
              backgroundColor: themeStyles.cardBackground,
              color: themeStyles.color,
              padding: "15px",
              borderRadius: "8px",
              cursor: "pointer",
              border: `1px solid ${themeStyles.borderColor}`,
              textAlign: "center",
              transition: "transform 0.2s, background-color 0.3s",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <img
              src={user.picture.large}
              alt={`${user.name.first} ${user.name.last}`}
              style={{ borderRadius: "50%", width: "80px", height: "80px", marginBottom: "10px" }}
            />
            <p style={{ fontWeight: "bold", color: themeStyles.linkColor }}>{user.name.first} {user.name.last}</p>
            <p>{user.location.city}, {user.location.country}</p>
          </div>
        ))}
      </div>

      {selectedUser && (
        <>
          <UserDetails user={selectedUser} />
          <UserForm user={selectedUser} />
        </>
      )}
    </div>
  );
}

export default UserList;
