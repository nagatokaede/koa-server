module.exports = {
  apps : [{
    name: 'API',
    script: 'server/server.js',

    output: 'logs/out.log',
    error: 'logs/error.log',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    // args: 'one two',
    instances: 1,
    autorestart: true,
    // watch: ['server', 'middleware', 'modules', 'util'], // 监听
    // ignore_watch : ['node_modules', 'public', 'logs', 'test'], // 监听过滤
    max_memory_restart: '100M', // 最大内存占用数
    // max_restarts: 20, // 最大重启数
    // restart_delay: 10000, // 重启间隔 10 s
    exec_mode: "fork", // fork 方式启动
    env: {
      NODE_ENV: 'production',
      OSS_region: 'oss-cn-shanghai', // OSS 服务区域
      OSS_accessKeyId: '', // AccessKeyId
      OSS_accessKeySecret: '', // AccessKeySecret
      OSS_internal: true, // 是否内网访问，生产环境内网访问
    }
  }],

  // deploy : {
  //   production : {
  //     user : 'node',
  //     host : '212.83.163.1',
  //     ref  : 'origin/master',
  //     repo : 'git@github.com:repo.git',
  //     path : '/var/www/production',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
  //   }
  // }
};
