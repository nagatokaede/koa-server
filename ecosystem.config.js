module.exports = {
  apps : [{
    name: 'API',
    script: 'server/server.js',

    output: 'logs/out.log',
    error: 'logs/error.log',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    // args: 'one two', // 包含通过CLI传递给脚本的所有参数的字符串
    instances: 1, // 要启动的应用程序实例数
    autorestart: true, // 默认为true。如果为false，则PM2如果崩溃或和平结束，将不会重新启动您的应用
    watch: ['server', 'middleware', 'modules', 'util'], // 监听
    // ignore_watch : ['node_modules', 'public', 'logs', 'test'], // 监听过滤
    max_memory_restart: '100M', // 最大内存占用数
    // max_restarts: 20, // 最大重启数
    restart_delay: 10000, // 重启间隔 10 s
    exec_mode: "fork", // fork 方式启动
    env: {
      NODE_ENV: 'development',
    },
    env_pro: { // pm2 start ecosystem.config.js --env pro，将环境切换到 env_pro
      NODE_ENV: 'production',
    },
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
