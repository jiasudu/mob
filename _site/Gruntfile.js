module.exports = function(grunt) {
    // 项目配置信息，这里只是演示用，内容随便填的
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
                ' * =====================================================\n' +
                ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
                ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' * Licensed under <%= pkg.license %> \n' +
                ' *\n' +
                ' * v<%= pkg.version %> .\n' +
                ' * =====================================================\n' +
                ' */\n', 
        jshint: {
            options: {
                jshintrc: 'js/.jshintrc'
            },
            /*
            grunt: {
                options: {
                    jshintrc: '.gruntjshintrc'
                },
                src: ['Gruntfile.js']
            },
            */
            src: {
                'src': ['js/*.js']
            },
            /*
            test: {
                src: 'js/tests/unit/*.js'
            },
            */
        },
        uglify: {   // compress js files.
            options: {
                report: 'min'
            },
            mobjs: {
                src: '<%= concat.mob.dest %>',
                dest: 'release/js/<%= pkg.name %>.min.js'
            }
        },
        concat: {   // concat files into single one.
            mob:{
                src: [
                    'js/*.js'
                ],
                dest: 'release/js/<%= pkg.name %>.js'
            }
        },
        less: {// compile less codes into css codes.
            compileCore: {
            options: {
              strictMath: true,
              sourceMap: true,
              outputSourceFiles: true,
              sourceMapURL: '<%= pkg.name %>.css.map',
              sourceMapFilename: 'release/css/<%= pkg.name %>.css.map'
            },
            files: {
              'release/css/<%= pkg.name %>.css': 'less/mob.less'
            }
        },
       lesslint:{
       },
        
                /*
                   minify: {
                   options: {
                   cleancss: true,
                   report: 'min'
                   },
                   files: {
                   'release/css/<%= pkg.name %>.min.css': 'release/css/<%= pkg.name %>.css',
                   'release/css/<%= pkg.name %>-theme.min.css': 'release/css/<%= pkg.name %>-theme.css'
                   }
                   }
                   */
        },
        cssmin: {
            compress: {
                options: {
                keepSpecialComments: '*',
                noAdvanced: true, // turn advanced optimizations off until the issue is fixed in clean-css
                report: 'min',
                selectorsMergeMode: 'ie8'
                },
            src: [
                'release/css/mob.css',
                ],
            dest: 'release/css/mob.min.css'
            }
        },
        watch: {  // watch任务，实时监听文件的变化，并进行编译
            src: {
                files: '<%= jshint.src.src %>',
                tasks: ['dist-js', 'copy:docs'], //'jshint:src', 'qunit'],
                options: {
                    livereload: true
                }
            },
            /*
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'qunit']
            },
            */
            less: {
                files: 'less/*.less',
                tasks: ['dist-css','copy:docs'],
                options: {
                    livereload: true
                }
            }
        },
        open: { // open the url through browser
            /*
            "docs" : {
                path: 'http://localhost:3000/docs'
            },
            */
            "examples" : {
                path: 'http://localhost:<%= connect.webserver.options.port %>/docs/examples'
            }
        },
        connect: { // start httpserver to view examples and docs through browser.
            webserver: {
                options: {
                    keepalive: true,
                    port: 8888,
                    base: '.'
                }
            }
        },
        jekyll: {
          options: {
            config: '_config.yml'
          },
          docs: {},
          github: {
            options: {
              raw: 'github: true'
            }
          }
        },
        copy: {
            font: {
                expand: true,
                src: [
                    'fonts/*'    
                ],
                dest: 'release/'
            },
            docs: {
                expand: true,
                cwd: './release',
                src: [
                  '{css,js}/*',
                  'fonts/*'
                ],
                dest: 'docs/'
            }
        },
        concurrent: {
            dev: {
                tasks: ['connect', 'watch', 'open'],
                options: {
                    limit: 3,
                    logConcurrentOutput: true
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
    // JS distribution task.
    grunt.registerTask('dist-js', ['concat', 'uglify']);
    // CSS distribution task.
    //grunt.registerTask('dist-css', ['lesslint', 'less', 'cssmin', 'csscomb', 'usebanner']);
    grunt.registerTask('dist-css', ['less', 'cssmin']);
    grunt.registerTask('dist-font', ['copy:font']);
    grunt.registerTask('build', ['dist-js', 'dist-css', 'dist-font', 'copy:docs']);
	grunt.registerTask('default', ['build']);
    grunt.registerTask('dev', 'Start a developing envirment', [
        'concurrent:dev'
    ]); 
    grunt.registerTask('docs-github', ['jekyll:github']);
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=100: */
