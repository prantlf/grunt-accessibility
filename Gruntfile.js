module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: [
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['reports']
    },

    // Combine js into a dist directory
    uglify: {
      dist: {
        files: {
          'tasks/HTML_CodeSniffer/dist/HTMLCS.min.js': [
            'tasks/HTML_CodeSniffer/Standards/**/*.js',
            'tasks/HTML_CodeSniffer/HTMLCS.js',
            'tasks/HTML_CodeSniffer/PhantomJS/runner.js'
          ]
        }
      }
    },

    /* Configuration to be run (and then tested).
     *
     * accessibilityLevel: Levels are 'WCAG2A', 'WCAG2AA', 'WCAG2AAA', 'Section508'
     * domElement: whether to include DOM element reference data or not
     *             (tag name, class names & id), default: true
     *
     * outputFormat: specify report output format (text, json), default: text
     * ignore: ignore rules, useful for partials
     * force: force skip of ERROR messages
     * verbose: produce verbose output
     *
     */
    accessibility: {
      txt: {
        options: {
          accessibilityLevel: 'WCAG2A',
          domElement: false,
          force: true
          // ignore : [
          //   'WCAG2A.Principle2.Guideline2_4.2_4_2.H25.1.NoTitleEl'
          //   'WCAG2A.Principle3.Guideline3_1.3_1_1.H57.2'
          // ]
        },
        files: [{
            expand: true,
            cwd: 'example/',
            src: ['*.html'],
            dest: 'reports/',
            ext: '-report'
          }]
      },
      txtDom: {
        options: {
          accessibilityLevel: 'WCAG2A',
          force: true
        },
        files: [{
            expand: true,
            cwd: 'example/',
            src: ['*.html'],
            dest: 'reports/',
            ext: '-report-dom'
          }]
      },
      json: {
        options: {
          accessibilityLevel: 'WCAG2A',
          outputFormat: 'json',
          domElement: false,
          force: true
        },
        files: [{
            expand: true,
            cwd: 'example/',
            src: ['*.html'],
            dest: 'reports/',
            ext: '-report'
          }]
      },
      jsonDom: {
        options: {
          accessibilityLevel: 'WCAG2A',
          outputFormat: 'json',
          force: true
        },
        files: [{
            expand: true,
            cwd: 'example/',
            src: ['*.html'],
            dest: 'reports/',
            ext: '-report-dom'
          }]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  /* Whenever the "test" task is run, first clean the "tmp" dir, then run this
   * plugin's task(s), then test the result.
   */
  grunt.registerTask('build', ['uglify']);
  grunt.registerTask('node', ['nodeunit', 'clean']);
  grunt.registerTask('test', ['jshint', 'accessibility', 'node']);

  // By default, lint and run all tests.
  return grunt.registerTask('default', ['test', 'build']);
};