const apiRegion = new Map([
  [
    'US',
    {
      code: 'US',
      base: 'https://us-iot.meross.com',
    },
  ],
  [
    'EU',
    {
      code: 'EU',
      base: 'https://eu-iot.meross.com',
    },
  ],
]);

module.exports = apiRegion;
