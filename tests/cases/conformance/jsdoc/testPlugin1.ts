// @allowJs: true
// @filename: testPlugin1.js
// @out: dummy159.js
global.jsdocPluginsTest.plugin1 = {};

exports.handlers = {
    fileBegin: function() {
        global.jsdocPluginsTest.plugin1.fileBegin = true;
    },
    beforeParse: function() {
        global.jsdocPluginsTest.plugin1.beforeParse = true;
    },
    jsdocCommentFound: function() {
        global.jsdocPluginsTest.plugin1.jsdocCommentFound = true;
    },
    symbolFound: function() {
        global.jsdocPluginsTest.plugin1.symbolFound = true;
    },
    newDoclet: function() {
        global.jsdocPluginsTest.plugin1.newDoclet = true;
    },
    fileComplete: function() {
        global.jsdocPluginsTest.plugin1.fileComplete = true;
    }
};

exports.defineTags = function(dictionary) {
    dictionary.defineTag("foo", {
        canHaveName: true,
        onTagged: function(doclet, tag) {
            doclet.foo = true;
        }
    });
};
