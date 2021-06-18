const fs = require('fs');
const crypto = require('crypto');
const uuid_v4 = require('uuid').v4;

const installation_id = uuid_v4();
const android_id = crypto.randomBytes(8).toString('hex');

const config = {
    mobile: {
        installation_id,
        android_id,
    },
};

const data = JSON.stringify(config, null, 2);
fs.writeFileSync('config.json', data, 'utf-8');

