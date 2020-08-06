# 使用方法

解决小程序keyFrames 在不同文件时候的时候，命名相同会相互影响的问题，使用方法如下

```
		gulp.src('./pages/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([keyFramesScoped]))
        .pipe(gulp.dest('./pages'));
```