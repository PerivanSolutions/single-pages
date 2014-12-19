// Build up a map of SCSS files to process, and their desired locations
var scssFiles;
    
scssFiles = function scssFiles() {
  var dest,
      result = {},
      files = require('glob').sync('src/**/*.scss'),
      i = files.length;

  while (i--) {
    dest = 'out/' + files[i].replace('src/', '')
                            .replace('.scss', '.css');
    result[dest] = files[i];
  }
  return result;
};


module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['out/*', '!out/.keep'],

    sass: {
      dev: {
        files: scssFiles()
      }
    },

    copy: {
      main: {
        expand: true,
        cwd: 'src/',
        src: ['**', '!*.scss'],
        dest: 'out/'
      }
    },

    connect: {
      server: {
        options: {
          livereload: true,
          port: 4000,
          base: 'out'
        }
      }
    },

    watch: {
      scss: {
        files: 'src/*.scss',
        tasks: 'sass',
        options: { livereload: true }
      },
      misc: {
        files: ['src/*', '!**/*.scss'],
        tasks: 'copy',
        options: { livereload: true }
      }
    }
  });


  grunt.registerTask(
    'default',
    'Development. Compile and serve',
    [
      'clean',
      'sass',
      'copy',
      'connect',
      'watch'
    ]
  );
};
