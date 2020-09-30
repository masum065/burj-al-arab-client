import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
  const [bookings, setBooknings] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  useEffect(() => {
    const apiURL = 'http://localhost:5000';
    fetch(`${apiURL}/bookings?email=${loggedInUser.email}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBooknings(data));
  }, [loggedInUser.email]);

  return (
    <div>
      <h3>Booking Count : {bookings.length}</h3>

      {bookings.map((booking) => (
        <li key={booking._id}>
          Name : {booking.name} Email: {booking.email} CheckIN:
          {booking.checkIN} CheckOut: {booking.checkOUT}
        </li>
      ))}
    </div>
  );
};

export default Bookings;
