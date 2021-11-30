const { inspect } = require('util');
const { program } = require('commander');

const loginAction = require('../actions/loginAction');
const generateConfigAction = require('../actions/generateConfigAction');

program.version('0.0.1');

const errorWrapper =
  (fn) =>
  (...args) => {
    Promise.resolve(fn(...args)).catch((err) => {
      process.stderr.write(inspect(err));
      process.exit(1);
    });
  };

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
