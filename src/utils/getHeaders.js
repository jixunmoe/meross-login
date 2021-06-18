const AppVersion = '2.28.1';
const vender = 'meross';
const AppLanguage = 'zh-Hant';
const AppType = 'Android';

module.exports = function getHeaders(userToken = '') {
    return {
        AppVersion,
        vender,
        AppLanguage,
        AppType,
        Authorization: `Basic ${userToken}`
    };
};
