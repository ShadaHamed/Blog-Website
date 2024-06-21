
const useDateTime = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const day = date.getDate();
    const fullDate = month + '/'+ day + '/' + year;

    const time = date.getHours() 
        + ':' + date.getMinutes() 
        + ":" + date.getSeconds()
  return ( {fullDate, time})
}

export default useDateTime