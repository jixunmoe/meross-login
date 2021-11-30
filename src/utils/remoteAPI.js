// class: com.meross.http.Remote

const fetch = require('node-fetch');
const getHeaders = require("./getHeaders");
const getMobileInfo = require("./getMobileInfo");
const { encryptBody } = require("./httpUtils");

// in the case of the error, update the remoteBase URL.
// {
//     "apiStatus": 1030,
//     "sysStatus": 0,
//     "data": {
//         "domain": "https://us-iot.meross.com",
//         "mqttDomain": "mqtt-us.meross.com"
//     },
//     "info": "redirect app to login other than this region",
//     "timeStamp": 1623977935
// }

const apiRegion = new Map([
    ["US", {
        code: "US",
        base: "https://us-iot.meross.com",
    }],
    ["EU", {
        code: "EU",
        base: "https://eu-iot.meross.com",
    }],
]);

class RemoteAPI {
    config = { };
    accountCountryCode = "";
    remoteBase = "";

    constructor(config) {
        this.config = config;
        this.setRegion('US');
    }

    /**
     * @deprecated Use {@link setRegion setRegion('US')} instead.
     */
    setRegionToUS() {
        this.setRegion('US');
    }

    setRegion(regionCode) {
        if (!apiRegion.has(regionCode)) {
            throw new RangeError(`
                invalid region code given: ${regionCode};
                expected one of: ${Array.from(apiRegion.keys())}
            `);
        }
        const { code, base } = apiRegion.get(regionCode);
        this.accountCountryCode = code;
        this.remoteBase = base;
    }

    async signIn(email, password) {
        const url = new URL("/v1/Auth/signIn", this.remoteBase).toString();
        const headers = {
            ...getHeaders(),
            'Content-Type': 'application/json',
        };
        const payload = encryptBody({
            email,
            password,
            accountCountryCode: this.accountCountryCode,
            mobileInfo: getMobileInfo(this.config),
        });

        const resp = await fetch(url, {
            headers,
            method: 'POST',
            body: JSON.stringify(payload)
        });
        return resp.json();
    }
}

module.exports = RemoteAPI;
