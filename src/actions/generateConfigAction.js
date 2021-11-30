const fs = require('fs').promises;
const generateConfig = require('../bin/gen-config');

async function generateConfigAction(options) {
  const { config } = options;

  process.stderr.write('generating config... ');
  const data = JSON.stringify(generateConfig(), null, 2);
  await fs.writeFile(config, data, 'utf-8');
  process.stderr.write('OK!\n');
}

module.exports = generateConfigAction;
