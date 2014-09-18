/*Every Gruntfile (and gruntplugin) uses this basic format, and all of your Grunt code must be specified inside this function:

Basic Grunt Structure
    module.exports = function(grunt) {

        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'), // the package file to use

            taskName: {
                // internal task or name of a plugin (like "qunit")
                // options, etc (see the task/plugin for details)
            },
            ...
        });

        // load up your plugins
        grunt.loadNpmTasks('grunt-contrib-pluginName');

        // register one or more task lists (you should ALWAYS have a "default" task list)
        grunt.registerTask('default', ['taskToRun']);
        grunt.registerTask('taskName', ['taskToRun', 'anotherTask']);
    };

*/
/* jshint node: true */
module.exports = function(grunt) {
    // Do grunt-related things in here

    //STEP1: Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        /* This Task will be used to create the build. Currently only copying files form source to destination*/
        copy: {
            build: {
                cwd: "app",
                src: ["**/*", "!**/libs/**"],
                dest: "build",
                expand: true
            }
        },

        /* Everyime we do a build, It would be convinent to delete the files and re install it */
        clean: {
            build: {
                src: ["build"]
            }

        },

        /*Automating the Work of installing Bower dependencies. Now the only command needed is grunt*/
        "bower-install-simple": {
            options: {
                color: true
            },
            "dev": {
                options: {
                    production: false
                }
            }
        },

        /* Automating the task of Running a Local server to fetch files.*/
        run: {
            options: {
                wait: false
            },
            server: {
                //Default executable command is node. If you want to specify anything else use exec : "node server.js"
                args: ["./server.js"]
            }
        },

        /* Opening the browerser with a specific URL . can be changed for prod and dev and qa*/
        open: {
            dev: {
                path: "http://localhost:3000/app",
                app: "Google Chrome"
            }

        },

        /*
         See http://usejsdoc.org/ For More Info. Used to Generate Java Like Documantation for Javascript.
         */
        jsdoc : {
            dist : {
                src: ["app/**/*", "!app/libs/**/*"],
                dest: "doc"
            }
        },

        /*
        Configuration Of Intern to automate the Unit Test Cases. We are using Intern as our JS Testing Framework.
        Link For using Intern With Grunt : https://github.com/theintern/intern/wiki/Using-Intern-with-Grunt
         */

        intern: {

            runner: {
                options: {
                    runType: "runner",
                    config: "tests/intern"
                }

            },

            client: {
                options : {
                    config: "tests/intern",
                    runType: "client" // Client is the default option for runType, didnt have to include this . Was Not required.
                }
            } 
        },

<<<<<<< HEAD
        },
=======
        compass: {
            options: {
                config: "./app/assets/config.rb",
                basePath: ".",
                trace: true
            },
            clean: {
                options: {
                    clean: true
                }
            },
            compile: {}
        }
>>>>>>> Adding Compass Grunt Task along with SASS

        jscs :{
            source: {
                src: ["app/**/*.js", "!app/libs/**/*"]
            },
            test: {
                src: ["./test/**/*.js"]
            }
        },

        jshint : {
            gruntfile: {
                options: {
                    jshintrc: ".jshintrcgruntfile"
                },
                src: "Gruntfile.js"
            },
            source: {
                src: ["app/**/*.js", "!app/libs/**/*"]
            },
            test: {
                src: ["./test/**/*.js"]
            }
        }
    });

    //STEP2: Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-bower-install-simple");
    grunt.loadNpmTasks("grunt-run");
    grunt.loadNpmTasks("grunt-open");
    grunt.loadNpmTasks("grunt-jsdoc");
<<<<<<< HEAD
    grunt.loadNpmTasks("intern");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-jscs");
=======
    grunt.loadNpmTasks('intern');
    grunt.loadNpmTasks('grunt-contrib-compass');
>>>>>>> Adding Compass Grunt Task along with SASS

    //STEP3: Default task(s).
    grunt.registerTask("default", ["bower-install-simple", "clean", "copy"]);
    grunt.registerTask("startServer", ["run:server", "open:dev", "wait:server"]);
    grunt.registerTask("dev", ["bower-install-simple", "startServer"]);

    //Test Tasks
    grunt.registerTask("test", ["intern:client"]);

    //Linting tasks
    grunt.registerTask("lint", ["jshint", "jscs"]);
};