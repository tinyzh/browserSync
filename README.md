#安装
>npm install --save-dev browser-sync

#引入
>var browserSynv = require('browser-sync').create();
var reload = browserSync.reload;

##监听模板
```
gulp.task('html',function(){
 gulp.watch(["skin4/*.htm","skin4/**/*.htm"]).on('change',browserSync.reload);
});
```
#热重载
>pipe(reload({stream:true}))

#开启任务
```
gulp.task('browser-sync', function() {    browserSync.init({});});
gulp.task("default",function(){    gulp.start(["watchLess","watchJs","browser-sync","html"]);});
```
#网站里面加上公共代码  具体代码需要查看控制台输出
```
<script id="__bs_script__">document.write("<script async src='http://HOST:3000/browser-sync/browser-sync-client.2.13.0.js'><\/script>".replace("HOST", location.hostname));</script>
```

##然后就可以通过自己本地配置的域名进行访问了
具体网站配置文件
[配置代码]()

