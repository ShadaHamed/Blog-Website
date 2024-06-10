import React from 'react'

const DateTime = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const fullDate = month + '/'+ date + '/' + year;

    const Time = date.getHours() 
        + ':' + date.getMinutes() 
        + ":" + date.getSeconds()
        
  return ( fullDate, Time )
}

export default DateTime

