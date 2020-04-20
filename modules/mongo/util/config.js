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

module.exports = {
  configFind,
  configInsert
};
