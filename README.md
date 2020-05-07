koa-server
======================
> 使用 koa 创建一个基础的后台框架

主要实现功能
* mongo 数据库增删改查
* token 机制
* 流文件上传对接 ali-oss 
* ins 爬虫

### 目录
* [启动](#启动)
* [技术栈](#技术栈)
* [目录结构](#目录结构)
* [token](#token)
* [mongoose](#mongoose)

启动
--------------------------------
```Bash
# 添加包
$ npm i

# 启动 mongo
$ mongod --dbpath [path] --port 15498

# 连接 mango
$ mongo mongodb://user:password@host:port/webapp-node-project

# mongo 中添加 oss 配置信息
$ db.config.insert({ region: "", accessKeyId: "", accessKeySecret: "" })

# 开发 运行服务
$ npm run dev

# 生产 运行服务
$ npm run server
```

技术栈
--------------------------------
* node
* koa
* ali-oss
* busboy
* mongo
* mongoose
* npm
* pm2

目录结构
--------------------------------
```
├─middleware  【中间件】
│  ├─router   【路由】
│  │   └─route【子路由接口api】
│  ├─upload   【上传文件中间件】
│  ├─access.js【token中间件】
│  └─logger.js【日志中间件】
├─modules     【自制模块】
│  ├─axios    【axios 下载】
│  ├─instagramSpider 【ins 爬虫】
│  ├─mongo    【mongoose 数据库增删改查】
│  └─oss      【ali-oss】
├─server      【主服务】
│  ├─server.js【koa】
│  └─config.js【配置参数】
└─util        【工具】
    ├─crypto  【加密】
    ├─fs      【node fs 封装】
    └─jwt     【签名】
```

token
--------------------------------
> 登录后 token 会签发再 header 中
>
> 每一次请求都会重新签发一个新的 token 在 header 中
>
> 30 分钟无请求 token 将失效需重新登录

token 签名借助密钥 `ssh` `openssl`

`ssh` 创建私钥
```Bahs
# 打开Git Bash。

# 粘贴以下文本，替换为您的GitHub电子邮件地址。

$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
# 使用提供的电子邮件作为标签，这将创建一个新的ssh密钥。
```
> Generating public/private rsa key pair.
当提示您“输入要在其中保存密钥的文件”时，请按Enter。这接受默认文件位置。
>
> Enter a file in which to save the key (/c/Users/you/.ssh/id_rsa):[Press enter]
在提示符下，键入一个安全密码。有关更多信息，请参阅“使用SSH密钥密码短语”。
>
> Enter passphrase (empty for no passphrase): [Type a passphrase]
> Enter same passphrase again: [Type passphrase again]

`openssl` 根据 `ssh` 创建公钥

```Bash
$ openssl rsa -in private.key -pubout -outform PEM -out public.key
```

token 签名借助工具 `jsonwebtoken`

安装 `jsonwebtoken`
```Bash
$ npm install jsonwebtoken
```
> 私钥签名；公钥解签

mongoose
--------------------------------

