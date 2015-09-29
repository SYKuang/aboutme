/* global module:false */
module.exports = function(grunt) {
	var port = grunt.option('port') || 8000;
	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner:
				'/*!\n' +
				' * reveal.js <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
				' * http://lab.hakim.se/reveal-js\n' +
				' * MIT licensed\n' +
				' *\n' +
				' * Copyright (C) 2015 Hakim El Hattab, http://hakim.se\n' +
				' */'
		},

    //qunit: {
      //files: [ 'test/*.html' ]
    //},

		uglify: {
			options: {
				banner: '<%= meta.banner %>\n',
        force :true
			},
			build: {
				//src: ['assets/js/angular/translate.js'],
				//dest: 'js/min.js',
			}
		},

		//sass: {
			//core: {
				//files: {
					//'css/reveal.css': 'css/reveal.scss',
				//}
			//},
			//themes: {
				//files: [
					//{
						//expand: true,
						//cwd: 'css/theme/source',
						//src: ['*.scss'],
						//dest: 'css/theme',
						//ext: '.css'
					//}
				//]
			//}
		//},

		//autoprefixer: {
			//dist: {
				//src: 'css/reveal.css'
			//}
		//},

		//cssmin: {
			//compress: {
				//files: {
					//'css/reveal.min.css': [ 'css/reveal.css' ]
				//}
			//}
		//},

		jshint: {
			options: {
				curly: false,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				eqnull: true,
				browser: true,
				expr: true,
        force: true,
				globals: {
					head: false,
					module: false,
					console: false,
					unescape: false,
					define: false,
					exports: false
				}
			},
			files: [ 'Gruntfile.js' ,'js/min.js']
		},
		
		jade:{
			compile: {
				options: {
					client:false,
					pretty: true
				},
				files:{
					"index.html":"index.jade"
				}	
			}


		},

		connect: {
			server: {
				options: {
					port: port,
					base: '.',
					hostname: '0.0.0.0',
					livereload: true,
					open: true
				}
			}
		},

		zip: {
			'reveal-js-presentation.zip': [
				'index.html',
				'css/**',
				'js/**',
				'lib/**',
				'images/**',
				'plugin/**'
			]
		},

		watch: {
			options: {
				livereload: true
			},
			js: {
				files: [ 'Gruntfile.js', 'assets/js/*' ,'assets/js/angular/*.js'],
				tasks: 'js'
			},
			theme: {
				files: [ 'css/theme/source/*.scss', 'css/theme/template/*.scss' ],
				tasks: 'css-themes'
			},
			css: {
				files: [ 'css/reveal.scss' ],
				tasks: 'css-core'
			},
			html: {
				files: [ '*.html']
			},
			source:{
				files: ['index.jade'],
				tasks:'compileJade'
			},
      bower:{
        files: ['bower_components/*'],
        tasks :'wiredep'
      },
      translate:{
        files:['languages/*']
      }
		},
    wiredep: {
      target: {
        src: 'index.html' // point to your HTML file.
      }
    }
	});

	// Dependencies
	grunt.loadNpmTasks( 'grunt-contrib-qunit' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadNpmTasks( 'grunt-autoprefixer' );
	grunt.loadNpmTasks( 'grunt-zip' );
	grunt.loadNpmTasks( 'grunt-contrib-jade');	
  grunt.loadNpmTasks('grunt-wiredep');

	// Default task
	grunt.registerTask( 'default', [ 'css', 'js' ] );

	// JS task
	grunt.registerTask( 'js', [ 'jshint', 'uglify' ] );

	// Theme CSS
	grunt.registerTask( 'css-themes', [ 'sass:themes' ] );

	// Core framework CSS
	grunt.registerTask( 'css-core', [ 'sass:core', 'autoprefixer', 'cssmin' ] );

	// All CSS
	grunt.registerTask( 'css', [ 'sass', 'autoprefixer', 'cssmin' ] );
  
  // Compile jade and add bower components
  grunt.registerTask('compileJade',['jade','wiredep']);

  // Package presentation to archive
	grunt.registerTask( 'package', [ 'default', 'zip' ] );

	// Serve presentation locally
	grunt.registerTask( 'serve', [ 'compileJade','connect','watch'] );

	// Run tests
	grunt.registerTask( 'test', [ 'jshint', 'qunit' ] );

};
