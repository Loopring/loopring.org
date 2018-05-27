







## 常见命令

```
#### 环境
- node ：https://nodejs.org/
- gulp ：npm install -g gulp 

#### 安装依赖
npm install

#### 开发调试
npm run dev

#### 自动部署到 gh-pages
npm run deploy

#### 打包文件
npm run prod

```

## 常见命令问题

问题1：
```
Error in plugin 'gulp-gh-pages'
ENOENT: no such file or directory, open '.publish/.git/HEAD'
解决方案：https://github.com/shinnn/gulp-gh-pages/issues/87
```

问题2
```
Error in plugin 'gulp-imagemin'
Library not loaded: /usr/local/opt/libpng/lib/libpng16.16.dylib
快速解决方案：
- 打开 gulp/tasks/images.js
- 注释掉 imagemin  相关的代码
```
