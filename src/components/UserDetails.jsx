// src/components/UserDetails.jsx
import React, { useMemo } from 'react';

function UserDetails({ user }) {
  // Use useMemo to calculate any derived details from user data, if needed
  const details = useMemo(() => {
    return {
      name: `${user.name.title} ${user.name.first} ${user.name.last}`,
      email: user.email,
      phone: user.phone,
      location: `${user.location?.city}, ${user.location?.country}`,
      address: `${user.location?.street?.number || 'N/A'} ${user.location?.street?.name || 'N/A'}`,
      picture: user.picture?.large,
    };
  }, [user]);

  return (
    <div style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "8px", marginTop: "20px" }}>
      <img src={details.picture} alt={details.name} style={{ borderRadius: "50%", width: "80px", height: "80px" }} />
      <h3>{details.name}</h3>
      <p>Email: {details.email}</p>
      <p>Phone: {details.phone}</p>
      <p>Location: {details.location}</p>
      <p>Address: {details.address}</p>
    </div>
  );
}

export default UserDetails;
