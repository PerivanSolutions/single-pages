// Build up a map of SCSS files to process, and their desired locations
var scssFiles;
    
scssFiles = function scssFiles() {
  var result = {},
      files = require('glob').sync('*.scss'),
      i = files.length;

  while (i--) {
    result['out/' + files[i].replace('.scss', '.css')] = files[i];
  }
  return result;
};

console.log(scssFiles());

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['output/*', '!output/.keep'],

    sass: {
      dev: {
        files: scssFiles()
      }
    }
  });

  grunt.registerTask(
    'default',
    'Development. Compile and serve',
    [
      'clean',
      'sass'
    ]
  );
};
