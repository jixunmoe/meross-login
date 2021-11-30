const fs = require('fs');
const crypto = require('crypto');
const uuid4 = require('uuid').v4;

function generateConfig() {
  const installationID = uuid4();
  const androidID = crypto.randomBytes(8).toString('hex');

  return {
    mobile: {
      installation_id: installationID,
      android_id: androidID,
    },
  };
}

if (require.main === module) {
  const data = JSON.stringify(generateConfig(), null, 2);
  fs.writeFileSync('config.json', data, 'utf-8');
}

module.exports = generateConfig;
