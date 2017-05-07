'use strict';

module.exports = function (grunt) {
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time at the end
  require('time-grunt')(grunt);


  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
          hostname: '0.0.0.0',
          base: 'app',
          port: 8080,
          livereload: true
        }
      }
    },
    wiredep: {
      app: {
        src: 'app/index.html'
      }
    },
    watch: {
      options: {
        livereload: true
      },
      target: {
        files: ['app/*.html', 'app/pages/*.html', 'app/styles/**/*.css', 'app/scripts/**/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-wiredep');
  // Default task.
  grunt.registerTask('default', ['connect', 'wiredep', 'watch']);
};
