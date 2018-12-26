







## 常见命令

```
#### 环境
- node ：https://nodejs.org/
- gulp ：npm install -g gulp 

#### 安装依赖
npm install

#### 开发调试
npm run dev


#### 打包文件
npm run prod

#### 自动打包并部署到 gh-pages
npm run prod && npm run deploy-gh-pages

```

如果遇到这样的问题：

```
[00:15:48] TypeError: Cannot read property '0' of null
    at Function.module.exports.Commit.actor (/Users/d/Projects/loopring/loopring.org/node_modules/gulp-gh-pages/node_modules/gift/lib/commit.js:145:56)
    at Function.module.exports.Commit.parse_commits (/Users/d/Projects/loopring/loopring.org/node_modules/gulp-gh-pages/node_modules/gift/lib/commit.js:111:21)
    at /Users/d/Projects/loopring/loopring.org/node_modules/gulp-gh-pages/node_modules/gift/lib/commit.js:55:39
    at ChildProcess.exithandler (child_process.js:282:7)
    at ChildProcess.emit (events.js:182:13)
    at ChildProcess.EventEmitter.emit (domain.js:460:23)
    at maybeClose (internal/child_process.js:961:16)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:248:5)

```

可以用如下方式解决：
```
cd node_modules/gulp-gh-pages/
npm install --save gift@0.10.2
cd ../../
gulp deploy
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



```
