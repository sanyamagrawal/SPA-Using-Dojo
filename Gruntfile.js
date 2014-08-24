//Every Gruntfile (and gruntplugin) uses this basic format, and all of your Grunt code must be specified inside this function:
module.exports = function(grunt) {
    // Do grunt-related things in here

    //STEP1: Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        //Task 1
        copy: {
            build: {
                cwd: "app",
                src: ["**/*", "!**/libs/**"],
                dest: "build",
                expand: true
            },
        },

        //Task 2
        clean: {
            build: {
                src: ["build"]
            },
        }

    });

    //STEP2: Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");

    //STEP3: Default task(s).
    grunt.registerTask("default", ["clean", "copy"]);
};