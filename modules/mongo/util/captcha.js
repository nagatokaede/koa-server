'use strict';

const ObjectId = require('mongoose').Types.ObjectId;
const { captchaModel } = require('../modules/captcha');

/**
 * ------- 创建验证码 ---------
 * body: {
 *   text: <String> 验证码
 * }
 */
const insert = body => {
  return new Promise((resolve, reject) => {
    // 创建验证码数据
    const captcha = new captchaModel({
      captcha: body.text,
      captchaDate: Date.now(),
    });

    // 保存数据
    captcha.save(err => {
      if (err) reject('创建验证码失败');

      resolve(captcha);
    });
  });
};

/**
 * ------- 更新验证码 ---------
 * body: {
 *   captchaId: <String> 数据库查询 _id
 *   text: <String> 验证码
 * }
 */
const update = body => {
  return new Promise((resolve, reject) => {
    // 更新验证码
    captchaModel.updateOne(
      {_id: ObjectId(body.captchaId)},
      {$set: { 'captcha': body.text, 'captchaDate': Date.now() }}
    ).
    then(docs => {
      resolve(docs);
    }).
    catch(err => {
      reject(err);
    });
  });
};

/**
 * ------- 查询单个验证码 ---------
 * body: {
 *   captchaId: <String> 数据库查询 _id
 * }
 */
const findOne = body => {
  return new Promise((resolve, reject) => {
    const params = { _id: ObjectId(body.captchaId) };
    if (body.captcha) params.captcha = body.captcha;
    captchaModel.findOne(params)
      .then(docs => {
        if (!docs) {
          docs = {
            status: 0,
            message: '验证码不存在！',
          };
        }
        resolve(docs);
      })
      .catch(err => {
        console.warn(err);
        reject(err);
      });
  });
};

/**
 * ------- 查询并删除单个验证码 ---------
 * body: {
 *   captchaId: <String> 数据库查询 _id
 *   captcha: <String> 验证码
 * }
 */
const findOneAndRemove = body => {
  return new Promise((resolve, reject) => {
    const params = { _id: ObjectId(body.captchaId), captcha: body.captcha };
    captchaModel.findOneAndRemove(params)
      .then(docs => {
        if (!docs) {
          docs = {
            status: 0,
            message: '验证码不存在！',
          };
        }
        resolve(docs);
      })
      .catch(err => {
        console.warn(err);
        reject(err);
      });
  });
}

/**
 * ------- 删除过期验证码 ---------
 */
const remove = () => {
  captchaModel.remove({ captchaDate: { $lte: Date.now() - 1000 * 60 * 5 } })
    .then(docs => {
      console.log(docs);
    })
    .catch(err => {
      console.warn(err);
    });
}

module.exports = {
  insert,
  update,
  findOne,
  findOneAndRemove,
  remove
};
