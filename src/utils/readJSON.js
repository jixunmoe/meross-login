const fs = require('fs');

function readJSON(path) {
  return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

module.exports = readJSON;
