// class: com.meross.http.net.HttpUtils

const { generateStr, encodeParams, md5 } = require('./safeUtils');

const salt = '23x17ahWarFH6w29';

function getUnixSeconds() {
  return Math.round(Date.now() / 1000).toString();
}

function encryptBody(payload = {}) {
  const params = encodeParams(JSON.stringify(payload));
  const timestamp = getUnixSeconds();
  const nonce = generateStr(16);

  let content = '';
  content += salt;
  content += timestamp;
  content += nonce;
  content += params;
  const sign = md5(content);

  return {
    sign,
    timestamp,
    params,
    nonce,
  };
}

module.exports = {
  encryptBody,
};
