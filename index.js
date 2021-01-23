const gulp = require("gulp");
const javascriptObfuscator = require("gulp-javascript-obfuscator");
gulp.src("test.js").pipe(javascriptObfuscator()).pipe(gulp.dest("./"));
