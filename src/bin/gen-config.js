const fs = require('fs');
const crypto = require('crypto');
const uuid_v4 = require('uuid').v4;

function generateConfig() {
    const installation_id = uuid_v4();
    const android_id = crypto.randomBytes(8).toString('hex');

    return {
        mobile: {
            installation_id,
            android_id,
        },
    };
}

if (require.main === module) {
    const data = JSON.stringify(generateConfig(), null, 2);
    fs.writeFileSync('config.json', data, 'utf-8');
}

module.exports = generateConfig;
