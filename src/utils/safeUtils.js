// class: com.reaper.framework.utils.SafeUtils

const crypto = require('crypto');

const nextInt = (n) => Math.floor(Math.random() * n);

const encodeParams = (str) => Buffer.from(str, 'utf-8').toString('base64');

function generateStr(n = 16) {
  let str = '';
  for (let i = 0; i < n; i += 1) {
    str += 'abcdefghijklmnopqrstuvwxyz0123456789'.charAt(nextInt(36));
  }
  return str;
}

function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(Buffer.from(str, 'utf-8'));
  return hash.digest('hex');
}

module.exports = {
  generateStr,
  md5,
  encodeParams,
};
