// @allowJs: true
// @filename: testPlugin2.js
// @out: dummy160.js
global.jsdocPluginsTest.plugin2 = {};

exports.handlers = {
    fileBegin: function() {
        global.jsdocPluginsTest.plugin2.fileBegin = true;
    },
    beforeParse: function() {
        global.jsdocPluginsTest.plugin2.beforeParse = true;
    },
    jsdocCommentFound: function() {
        global.jsdocPluginsTest.plugin2.jsdocCommentFound = true;
    },
    symbolFound: function() {
        global.jsdocPluginsTest.plugin2.symbolFound = true;
    },
    newDoclet: function() {
        global.jsdocPluginsTest.plugin2.newDoclet = true;
    },
    fileComplete: function() {
        global.jsdocPluginsTest.plugin2.fileComplete = true;
    }
};
