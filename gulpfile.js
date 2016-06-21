//用到的插件
var gulp = require('gulp'),
    rename = require('gulp-rename'),
 	minifyCss = require('gulp-minify-css'),
    spriter = require('gulp-css-spriter'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    watchPath = require('gulp-watch-path'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();
var reload = browserSync.reload;

//相对路径，结尾一定要加上 /

var baseUrl = 'skin4/dist/';

var lessUrl = baseUrl + 'css/',//未压缩的less目录
    cssUrl = baseUrl + 'mincss/',//压缩后的css目录
    jsUrl = baseUrl + 'js/',//未压缩的js目录
    minjsUrl = baseUrl + 'minjs/',//压缩后js目录    
    styleImg = baseUrl + 'images/styleimg/';//合并后的图片目录

var spriteName = 'sprite.png', //合并后的图片名称
    spriteUrl = '../images/styleimg/' + spriteName; //生成的css中图片路径


//检查JS语法
gulp.task('jshint',function () {
    return gulp.src(jsUrl + '*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('minless',function () {
    return gulp.src([lessUrl + '*.less','!'+lessUrl+'base/*.less'])
    //编译less
	.pipe(less())  
	//浏览器前缀
	.pipe(autoprefixer({
		browsers: ['last 2 versions','ie >= 9','Firefox >= 10','last 3 Safari versions'],//兼容那些版本浏览器
		//是否美化属性值 默认：true 像这样：
		//-webkit-transform: rotate(45deg);
		//        transform: rotate(45deg);
		cascade: true,
		//是否去掉不必要的前缀 默认：true 
		remove:true 
	}))
	//压缩css      
	.pipe(minifyCss({compatibility: 'ie7'}))
	//输出到路径
	.pipe(gulp.dest(cssUrl));
	//执行完毕后输出日志
	console.log("修改的文件：编译less成功");
});

gulp.task('minjs',function () {
    return gulp.src(jsUrl + '*.js')
    //rename文件名
	.pipe(rename({suffix: '.min'}))   
	//压缩
	.pipe(uglify())
	//输出到路径
	.pipe(gulp.dest(minjsUrl))
	//执行完毕后输出日志
	console.log("修改的文件：压缩js成功");
	
});


//自动编译LESS
gulp.task('watchLess', function() {
    gulp.watch(lessUrl + '*.less', function(event) {        
        var paths = watchPath(event , lessUrl , cssUrl);        
        //引入修改的文件路径
        gulp.src([lessUrl + paths.srcFilename , '!'+lessUrl+'base/*.less'])
        //编译less
        .pipe(less())  
        //浏览器前缀
        .pipe(autoprefixer({
            browsers: ['last 2 versions','ie >= 9','Firefox >= 10','last 3 Safari versions'],//兼容那些版本浏览器
            //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            cascade: true,
            //是否去掉不必要的前缀 默认：true 
            remove:true 
        }))

        //图片合并并生成css坐标(新项目可以用到)
        /*.pipe(spriter({ 
            //生成的spriter的位置 
            spriteSheet: styleImg + spriteName, 
            //生成样式文件图片引用地址的路径，如下将生产：backgound:url(../images/sprite.png) 
            pathToSpriteSheetFromCSS: spriteUrl
        }))*/

        //压缩css      
        .pipe(minifyCss({compatibility: 'ie7'}))
        //输出到路径
        .pipe(gulp.dest(cssUrl))
        .pipe(reload({stream:true}));//热重载
        //执行完毕后输出日志
        console.log("修改的文件：" + paths.srcPath + ' has ' + event.type);
        console.log("输出后的文件：" + paths.distPath);
    });
});


//自动压缩JS
gulp.task('watchJs', function () {
    gulp.watch(jsUrl + '*.js', function(event) {
        var paths = watchPath(event , jsUrl , minjsUrl);        
        gulp.src( jsUrl + paths.srcFilename )
        //rename文件名
        .pipe(rename({suffix: '.min'}))   
        //压缩
        .pipe(uglify())
        //输出到路径
        .pipe(gulp.dest(minjsUrl))
        .pipe(reload({stream:true}));
        //执行完毕后输出日志
        console.log("修改的文件：" + paths.srcPath + ' has ' + event.type);
        console.log("输出后的文件：" + paths.distDir + '.min.js');

    });
});


// 设置代理
gulp.task('browser-sync', function() {
    browserSync.init({});
});
//监听模板
gulp.task('html',function(){
    gulp.watch(["skin4/*.htm","skin4/**/*.htm"]).on('change', browserSync.reload);
});

gulp.task("default",function(){
    gulp.start(["watchLess","watchJs","browser-sync","html"]);
});
