const config = require('../../config.json');

// Pixel 3
const resolution = '1080*2160';
const carrier = '';
const deviceModel = 'google,Pixel 3';
const mobileOs = 'Android';
const mobileOsVersion = '11.0';

module.exports = function getMobileInfo() {
    const {
        android_id = '0000000000000000',
        install_uuid = '00000000-0000-0000-0000-000000000000'
    } = config.mobile;

    const uuid = android_id + install_uuid;

    return {
        resolution,
        carrier,
        deviceModel,
        mobileOs,
        mobileOsVersion,
        uuid,
    };
};
