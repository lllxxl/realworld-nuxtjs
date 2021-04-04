# fed-e-task-03-03

#### 手动部署
1. nuxt.config.js增加server配置server:{host: '0.0.0.0', port: 3000}
2. 运行nuxt build, 将.nuxt, static, nuxt.config.js, package.json, package-lock.json添加到压缩包
3. ssh root@106.75.108.252 
mkdir realworld-nuxtjs 
cd realworld-nuxt.js 
pwd 
exit
scp .\realworld-nuxtjs.zip root@106.75.108.252:/root/realworld-nuxtjs(将/root/realworld-nuxtjs替换为实际目录)

ssh root@106.75.108.252 
cd realworld-nuxtjs
unzip realworld-nuxtjs.zip
ls -a
npm i
npm i --global pm2
pm2 start npm -- start

pm2 stop ${id}
pm2 list
pm2 start
pm2 stop
pm2 reload 一个一个进程重启
pm2 restart 先杀死原有的进程
pm2 delete
访问http://106.75.108.252:3000

### 自动部署
#### 环境准备
1. 配置github access token
settings-personal settings-personal access token 填写name,勾选repo权限，点击generate
注意这个token只会出现一次，要自己存下来

2. 远程仓库-settings-secrets new secret 把生成的token填进去

3. 配置项目
- 根目录下创建.github\workflows 文件夹
- https://gist.githubusercontent.com/lipengzhou/b92f80142afa37aea397da47366bd872/raw/e0842faf4e587eafc7c2448de18305fbdd3db16e/main.yml 将该文件ctrl + S 保存至本地 文件后缀.yml, 保存类型选择所有文件
- 修改打包构建的run命令，增加pm2.config.json文件

