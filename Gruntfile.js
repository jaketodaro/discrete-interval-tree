module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/*.js'],
        dest: 'dist/discrete-interval-tree.js',
      },
    },

    babel: {
      options: {
        sourceMap: true,
          presets: ['es2015']
        },
        dist: {
          files: {
            'dist/discrete-interval-tree.js': 'dist/discrete-interval-tree.js'
          }
        }
     },

    jasmine: {
      main: {
        src: 'dist/discrete-interval-tree.js',
        options: {
          specs: 'specs/*.js',
          keepRunner: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default', ['concat', 'babel', 'jasmine']);

};
