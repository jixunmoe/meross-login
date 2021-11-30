const fs = require('fs');
const { inspect } = require('util');
const { program } = require('commander');

const generateConfig = require('./gen-config');
const RemoteAPI = require('../utils/remoteAPI');
const readJSON = require('../utils/readJSON');
program.version('0.0.1');

const errorWrapper = fn => (...args) => {
    Promise.resolve(fn(...args)).catch(err => {
        process.stderr.write(inspect(err));
        process.exit(1);
    });
}

program
    .command('login')
    .option('-r, --region [region]', 'meross region', 'US')
    .option('-c, --config [config]', 'path to config', 'config.json')
    .option('-o, --output [output]', 'path to api response output', 'user.json')
    .argument('<email>', 'credential email')
    .argument('<password>', 'credential password')
    .action(errorWrapper(loginAction));

program
    .command('generate-config')
    .option('-c, --config [config]', 'path to config', 'config.json')
    .action(errorWrapper(generateConfigAction));

program.parse(process.argv);

async function loginAction(email, password, options, command) {
    const { region, config, output } = options;
    const api = new RemoteAPI(readJSON(config));
    api.setRegion(region);
    const resp = await api.signIn(email, password);
    process.stderr.write('api resp: ' + inspect(resp) + '\n');
    if (resp.apiStatus === 0) {
        process.stderr.write(`login ok! save to ${output}... `);
        fs.writeFileSync(output, JSON.stringify(resp.data, null, 2), 'utf-8');
        process.stderr.write("all done! \n");
    } else {
        process.stderr.write("login failed :c\n");
    }
}

function generateConfigAction(options, command) {
    const { config } = options;

    process.stderr.write('generating config... ');
    const data = JSON.stringify(generateConfig(), null, 2);
    fs.writeFileSync(config, data, 'utf-8');
    process.stderr.write('OK!\n');
}
