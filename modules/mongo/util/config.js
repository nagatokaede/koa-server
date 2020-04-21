'use static';

const { configModel } = require('../modules/config');

const configFind = body => {
  return new Promise((resolve, reject) => {
    configModel.findOne(body)
      .then(docs => {
        resolve(docs);
      })
      .catch(err => {
        reject(err);
      })
  });
};

const configInsert = body => {
  return new Promise((resolve, reject) => {
    // 创建数据
    const config = new configModel({
      region: body.region,
      accessKeyId: body.accessKeyId,
      accessKeySecret: body.accessKeySecret,
      internal: body.internal,
      bucket: body.bucket,
    });

    // 保存数据
    config.save(err => {
      if (err) reject('新增配置失败');

      resolve('新增配置成功');
    });
  });
};

/**
 * ------- 修改用户密码 ---------
 * body {
 *   userName: <String> 用户名
 *   password: <String> 密码
 *   newPassword: <String> 新密码
 *   nickName: <string> 昵称
 * }
 */
const configChange = body => {
  return new Promise((resolve, reject) => {
    configFind()
      .then(docs => {
        if (docs) {
          configModel.updateOne(
            {_id: docs._id},
            {$set: {
                region: body.region || docs.region,
                accessKeyId: body.accessKeyId || docs.accessKeyId,
                accessKeySecret: body.accessKeySecret || docs.accessKeySecret,
                internal: body.internal || docs.internal,
                bucket: body.bucket || docs.bucket,
              }})
            .then(() => {
              resolve('config set success');
            })
            .catch(err => {
              reject('config set failed: ' + err);
            });
        } else {
          resolve('config not found')
        }
      })
      .catch(err => {
        reject('config set failed: ' + err);
      });
  });
};

module.exports = {
  configFind,
  configInsert,
  configChange
};
