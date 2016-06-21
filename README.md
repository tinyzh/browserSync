#browserSync gulp 配置 自定义域名访问
#安装
>npm install --save-dev browser-sync

#引入
>var browserSync = require('browser-sync').create();
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
![Paste_Image.png](http://upload-images.jianshu.io/upload_images/215275-cdf5b58828cba457.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```
<script id="__bs_script__">document.write("<script async src='http://HOST:3000/browser-sync/browser-sync-client.2.13.0.js'><\/script>".replace("HOST", location.hostname));</script>
```

##然后就可以通过自己本地配置的域名进行访问了
具体网站配置文件  请查看gulpfile.js

#如果想同时监听多个网站  就需要更改默认端口号  相应的网站里面引入文件的端口号也要改

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/215275-0318205d92ba6e6b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

>gulp.task('browser-sync', function() {    browserSync.init({        port:3002    });});
