# Meross user info fetch tool

## Install

Install node v14+, then run `npm ci` to setup dependencies.

## Usage

For command and its flags, run `node meross help` for built-in usage & help.

### CLI usage walkthrough

Run `generate-config` command to generate a random mobile config (uuid):

```bash
node meross generate-config
```

Then run the script to fetch user info:

```bash
# Login to US region (default)
node meross login "jixun.moe@your.email.com" "your-password"

# Login to EU region
node meross login --region EU "jixun.moe@your.email.eu" "your-password"
```

Your should see the following:

```json
{
  "apiStatus": 0,
  "sysStatus": 0,
  "data": {
    "token": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    "key": "ffffffffffffffffffffffffffffffff",
    "userid": "123456789",
    "email": "jixun.moe@your.email.com",
    "domain": "https://us-iot.meross.com",
    "mqttDomain": "mqtt-us.meross.com"
  },
  "info": "Success",
  "timeStamp": 123456789
}
```

... along with a message `login ok! save to user.json...`.

### Deprecated

Old login script, us region only:

```bash
node src/bin/do-login.js "jixun.moe@your.email.com" "your-password"
```

## API Region Error

In the case of region error:

```json
{
  "apiStatus": 1030,
  "sysStatus": 0,
  "data": {
    "domain": "https://us-iot.meross.com",
    "mqttDomain": "mqtt-us.meross.com"
  },
  "info": "redirect app to login other than this region",
  "timeStamp": 1623977935
}
```

Update `RemoteAPI::remoteBase` to the new `data.domain` field value.

The `us-iot.meross.com` domain is enabled by default.

## Some notes about user data usage for Meross API

`key` is required to sign your request to Meross' IOT device, in some cases.

See [Robdel12/homebridge-meross-plug#1][ticket] for more technical information.

[ticket]: https://github.com/Robdel12/homebridge-meross-plug/issues/1#issuecomment-863629201

```java
  private static BaseBean setupSign(String strFrom, String strMethod, String strNamespace) {  // setup some signature stuff
    BaseBean bean = new BaseBean();
    Header header = new Header();
    long time = System.currentTimeMillis() / 1000; // unix seconds
    String messageId = PackageFactory.generateMessageId(); // random MD5 string
    header.setMessageId(messageId);
    header.setSign(PackageFactory.calculateMD5AllParts(messageId, User.getInstance().key, String.valueOf(time)).toLowerCase());
    header.setFrom(strFrom);
    header.setTimestamp(Long.valueOf(time));
    header.setMethod(strMethod);
    header.setNamespace(strNamespace);
    header.setPayloadVersion(Integer.valueOf(1));
    bean.setHeader(header);
    return bean;
  }
```

Where:

```js
const calculateMD5AllParts = (a, b, c) => md5(a + b + c).toString('hex');
const generateMessageId = () => md5('anything unique').toString('hex');
```

For an example of the header, see: [Robdel12/homebridge-meross-plug/src/index.js#L146][sample]

[sample]: https://github.com/Robdel12/homebridge-meross-plug/blob/ba14af9e52ae6a1e7e283cdb74ef2eaaf6f0a7c8/src/index.js#L146-L156

## TODO

- [ ] Publish this package somewhere

## Source

* `meross_v2.28.1.apk`

## License

The 3-Clause BSD License
