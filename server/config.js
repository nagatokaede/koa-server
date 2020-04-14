'use static';

const env = process.env;

module.exports = {
  NODE_ENV: env.NODE_ENV || 'development',
  PORT: env.PORT || '3000',

  MONGO_HOST: env.MONGO_HOST || 'localhost',
  MONGO_PORT: env.MONGO_PORT || '15498',
  MONGO_DB: env.MONGO_DB || 'webapp-node-project',
  MONGO_USER: env.MONGO_USER || 'admin',
  MONGO_PASSWORD: env.MONGO_PASSWORD || '123456',

  // 上传代码前移除默认参数
  OSS_region: env.OSS_region || 'oss-cn-shanghai', // OSS 服务区域
  OSS_accessKeyId: env.OSS_accessKeyId || '', // AccessKeyId
  OSS_accessKeySecret: env.OSS_accessKeySecret || '', // AccessKeySecret
  OSS_internal: env.OSS_internal || false, // 是否内网访问，生产环境内网访问

  // OFF、WARN、DEBUG、ALL
  console_level: 'WARN'
};
