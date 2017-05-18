var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    jshint = require('gulp-jshint'),
    shell = require('gulp-shell');

gulp.task('lint',function(){'Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js'
    gulp.src(['meadowlark.js', 'public/js/**/*.js','lib/**/*.js','gulpfile.js', 'public/qa/**/*.js', 'qa/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
})
gulp.task('blc', shell.task([
     'blc http://localhost:3000 -ro'
]))

gulp.task('mocha', function(){
  gulp.src('qa/tests-*.js')
  .pipe(mocha({ui:'tdd'}))
})

gulp.task('default',function(){

})
