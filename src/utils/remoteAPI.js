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

class RemoteAPI {
    accountCountryCode = 'US';
    remoteBase = "https://iot.meross.com/";

    constructor() {
        this.setRegionToUS();
    }

    /**
     * FIXME: Not sure why, but it seems
     *        all region uses the US endpoint.
     * However, there's "eu-iot.meross.com" but gives the same 1030 error...
     */
    setRegionToUS() {
        this.accountCountryCode = 'US';
        this.remoteBase = "https://us-iot.meross.com";
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
            mobileInfo: getMobileInfo(),
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
