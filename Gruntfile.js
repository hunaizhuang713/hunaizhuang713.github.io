/*global module:false
 	0、前置条件：安装node环境（cmd -> node -v 查看是否安装 ）。
	1、安装插件命令  （_start.bat入口进去，按统一配置安装：npm install。如果安装停滞，中断进程重新npm install）。
	2、具体配置查看每个插件单独的配置文档。
	3、可全自动化（每次保存运行整个系统），也可半自动化（单独注册某个功能）。
*/
module.exports = function (grunt) {
    'use strict';
    var serveStatic = require('serve-static');
	var serveIndex = require('serve-index');
	var lrPort = 35729;
	var lrSnippet = require('connect-livereload')({ port: lrPort });
	var lrMiddleware = function(connect, options) {
	    return [
	      lrSnippet,
	      serveStatic(options.base[0]),
	      serveIndex(options.base[0])
	    ];
	 };
    grunt.initConfig({
        csslint: {
            /* 检查 CSS 语法 */
            src: ['css/*.css']
        },
        jshint: {
            /* 检查 js 语法 */
            all: ['Gruntfile.js', 'js/main.js', 'js/lib/*.js']
        },
        imagemin: {
            /* 压缩优化图片大小 */
            dist: {
                options: {
                    optimizationLevel: 3  /*总共是0-7默认是压缩等级是3*/
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src/img/',  /*压缩目录*/
                        src: ['**/*.{png,jpg,jpeg}'], // 优化 images 目录下所有 png/jpg/jpeg 图片
                        dest: 'frame/images/' // 保存位置，默认覆盖
                    }
                ]
            }
        },
        concat: {
            /* 合并 CSS 文件 */
            css: {
                src: ['css/normalize.min.css', 'css/cssgrids-min.css', 'css/helper.css', 'css/main.css', '...'],
                /* 根据目录下文件情况配置 */
                dest: 'css/all.css'
            },
            js: {
                src: ['src/index.js','src/isLogin.js'],
                /* 根据目录下文件情况配置 如果可以使用 require.js/LABjs 等配置更佳 */
                dest: 'js/index.min.js'
            }
        },
        cssmin: {
            /*压缩 CSS 文件为 .min.css */
            options: {
                keepSpecialComments: 0 /* 移除 CSS 文件中的所有注释 */
            },
            minify: {
                expand: true,
                cwd: 'src/css/',
                src: ['**/*.css'],
                dest: 'dest/css/',
                ext: '.min.css'
            }
        },
        uglify: {
            /* 最小化、混淆、合并 JavaScript 文件 */
            target: {
                files: [{
                    'portalpage/js/prod.min.js': ['src/js/production_serv.js']
                },{
                    'frame/js/homepage.min.js': ['src/js/homepage.js']
                }]
            },
            minjs: { //最小化、混淆所有 js/ 目录下的 JavaScript 文件
            }
        },
        connect: {
            options: {
              // 服务器端口号
              port: 8000,
              // 服务器地址(可以使用主机名localhost，也能使用IP)
              hostname: 'localhost',
              // 物理路径(默认为. 即根目录) 注：使用'.'或'..'为路径的时，可能会返回403 Forbidden. 此时将该值改为相对路径 如：/grunt/reloard。
              base: '.'
            },
            livereload: {
              options: {
                // 通过LiveReload脚本，让页面重新加载。
                middleware: lrMiddleware
              }
            }
          },
        htmlmin: {                                     // Task
		    dist: {                                      // Target
		      options: {                                 // Target options
		        removeComments: true,
		        collapseWhitespace: true
		      },
		      files: {                                   // Dictionary of files
		        /*'dist/index.html': 'src/index.html', */    // 'destination': 'source'
		        'src/release/index.html': 'src/index.html'
		      }
		    },
		    dev: { 
		    	options: {                                 // Target options
			        removeComments: true,
			        collapseWhitespace: true
			      },// Another target
		        files: [{
		          expand: true,
		          cwd: 'src',
		          src: ['html/**/*.html'],
		          dest: 'src/html/release'
		      }]
		    }
        },
        watch: {
            /* 监控文件变化并执行相应任务 */
            img: {
                files: ['frame/images/**/*.{png,jpg,jpeg}'],
                options: {
                    livereload: true
                }
            },
            minimages:{
            	files: ['src/img/**/*.{png,jpg,jpeg}'],
                tasks: ['newer:imagemin'],
                options: {
                	/*livereload: true*/
                }
            },
            css: {
                options: {
                    event: ['changed', 'added'],
                    livereload: true
                },
                files: ['frame/css/**/*.css','portalpage/css/**/*.css']
            },
            minicss:{
            	files: ['src/css/**/*.css'],
                tasks: ['newer:cssmin'],
                options: {
                	/*livereload: true*/
                }
            },
            js: {
                options: {
                    livereload: true
                },
                files: ['js/**/*.js','portalpage/js/**/*.js']
            },
            minijs: {
            	files: ['src/js/**/*.js'],
                tasks: ['newer:uglify'],
                options: {
                	/*livereload: true*/
                }
            },
            html: {
                options: {
                    livereload: true
                },
                files: ['*.html','portalpage/**/*.html']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    /*grunt.loadNpmTasks('grunt-contrib-csslint');*/
    /*grunt.loadNpmTasks('grunt-contrib-jshint');*/
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-newer');
    /*grunt.loadNpmTasks('grunt-contrib-concat');*/
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 定义默认任务
    /*grunt.registerTask('default', ['csslint', 'jshint', 'imagemin', 'cssmin', 'concat', 'uglify']);
    grunt.registerTask('css', ['concat:css', 'cssmin']);
    grunt.registerTask('dev', ['csslint', 'jshint']);*/
    grunt.registerTask('min-img', ['newer:imagemin']);
    /*grunt.registerTask('ug-js', ['concat:js','uglify:minjs']);*/
    grunt.registerTask('min-html', ['htmlmin:dev']);
    grunt.registerTask('live', ['newer:imagemin','newer:uglify','connect','watch']);
    
};