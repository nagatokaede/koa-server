'use strict';

const jwt = require('jsonwebtoken');
const fs = require('fs');

const dir = __dirname + '/keys';

// 公钥
const pubCert = fs.readFileSync(dir + '/public.key');
// 私钥
const priCert = fs.readFileSync(dir + '/private.key');

class JWT {
  /**
   * jwt签名
   * @param {*} payload object require
   * @param {*} exp number/string 设置过期时间的数量
   * @return {*} sign string
   */
  static sign(payload, exp = '30m') {
    const options = {
      algorithm: 'RS256',
      expiresIn: exp,
    };

    return new Promise((resolve, reject) => {
      jwt.sign(payload, priCert, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  }

  /**
   * jwt解签
   * @param {*} token string require
   * @return {*} tokenInfo string
   */
  static verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, pubCert, { algorithms: [ 'RS256' ] }, (err, tokenInfo) => {
        if (err) reject(err);
        resolve(tokenInfo);
      });
    });
  }
}

module.exports = JWT;
