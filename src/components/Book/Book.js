import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { setDate } from 'date-fns/esm';
import { Button } from '@material-ui/core';
import Bookings from '../Bookings/Bookings';

const Book = () => {
  const { bedType } = useParams();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = useState({
    checkIN: new Date(),
    checkOUT: new Date(),
  });

  const handleCheckInDate = (date) => {
    const newDates = { ...selectedDate };
    newDates.checkIN = date;
    setSelectedDate(newDates);
  };

  const handleCheckOutDate = (date) => {
    const newDates = { ...selectedDate };
    newDates.checkOUT = date;
    setSelectedDate(newDates);
  };

  const handleBooking = () => {
    const newBooking = { ...loggedInUser, ...selectedDate };

    fetch('http://localhost:5000/addBooking', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(newBooking),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Let's book a {bedType} Room.</h1>
      <p>
        Want a <Link to='/home'>different room?</Link>{' '}
      </p>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify='space-around'>
          <KeyboardDatePicker
            disableToolbar
            variant='inline'
            format='dd/MM/yyyy'
            margin='normal'
            id='date-picker-inline'
            label='Check In Date'
            value={selectedDate.checkIN}
            onChange={handleCheckInDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            variant='inline'
            format='dd/MM/yyyy'
            margin='normal'
            id='date-picker-inline'
            label='Check Out Date'
            value={selectedDate.checkOUT}
            onChange={handleCheckOutDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>

      <Button onClick={handleBooking} variant='contained' color='primary'>
        Book Now
      </Button>

      <Bookings />
    </div>
  );
};

export default Book;
