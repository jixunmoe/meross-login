const fs = require('fs');

module.exports = readJSON;

function readJSON(path) {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
}
