'use static';

const jwt = require('./index');

function verify(token) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      jwt.verify(token).then(tokenInfo => resolve(tokenInfo)).catch(err => reject(err));
    }, 400)
  });
}

(async function () {
  const payload = {
    name: 'nagato',
    id: '15498',
  };

  try {
    console.time('jwt');

    const token = await jwt.sign(payload, '1s');

    console.timeLog('jwt', token);

    const tokenInfo = await verify(token);

    console.timeLog('jwt', tokenInfo);

    console.timeEnd('jwt');
  } catch (err) {
    console.warn(err.message);
  }
})();
