const fs = require('fs');

const getData = () => {
    try {
        const filePath = 'data/db.json';
        console.log(`Attempting to read file: ${filePath}`);
        
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            return { users: [], blogs: [] };
        }
        
        const data = fs.readFileSync(filePath, 'utf-8');
        console.log(`File read successfully: ${filePath}`);
        
        const parsedData = JSON.parse(data);
        console.log('Data parsed successfully:', parsedData);
        
        return parsedData;
    } catch (err) {
        console.error('Error reading or parsing data.json:', err);
        return { users: [], blogs: [] };
    }
};

module.exports = getData;
