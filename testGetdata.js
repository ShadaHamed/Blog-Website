const getData = require('./getData'); // Adjust the path as needed

const testGetData = () => {
    const data = getData();
    console.log('Test getData output:', data);
};

testGetData();
