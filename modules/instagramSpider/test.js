'use static';

const { spider } = require('./index');

// test
(async function () {
  try {
    const res = await spider('https://www.instagram.com/p/BvYbAbrBU8v/?utm_source=ig_share_sheet&igshid=betpf9thpwz5');
    console.info(res);
  } catch (err) {
    console.warn(err);
  }
})();
