const fs = require('fs').promises;
const { inspect } = require('util');
const readJSON = require('../utils/readJSON');
const RemoteAPI = require('../utils/remoteAPI');

async function loginAction(email, password, options) {
  const { region, config, output } = options;
  const api = new RemoteAPI(readJSON(config));
  api.setRegion(region);
  const resp = await api.signIn(email, password);
  process.stderr.write(`api resp: ${inspect(resp)}\n`);
  if (resp.apiStatus === 0) {
    process.stderr.write(`login ok! save to ${output}... `);
    await fs.writeFile(output, JSON.stringify(resp.data, null, 2), 'utf-8');
    process.stderr.write('all done! \n');
  } else {
    process.stderr.write('login failed :c\n');
  }
}

module.exports = loginAction;
