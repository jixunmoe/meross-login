const RemoteAPI = require("../utils/remoteAPI");
const fs = require('fs');

// Example response when login success:
// {
//     "apiStatus": 0,
//     "sysStatus": 0,
//     "data": {
//         "token": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
//         "key": "ffffffffffffffffffffffffffffffff",
//         "userid": "123456789",
//         "email": "jixun.moe@example.com",
//         "domain": "https://us-iot.meross.com",
//         "mqttDomain": "mqtt-us.meross.com"
//     },
//     "info": "Success",
//     "timeStamp": 123456789
// }

async function main(argv) {
    const [email, password] = argv;
    if (!email || !password) {
        console.error("usage: <script> <email> <password>");
        return 1;
    }

    const api = new RemoteAPI();
    const resp = await api.signIn(email, password);
    console.info(resp);
    if (resp.apiStatus === 0) {
        console.info("login ok! save to user.json...");
        fs.writeFileSync("user.json", JSON.stringify(resp.data, null, 2), 'utf-8');
    }
}

main(process.argv.slice(2)).catch(console.error);
