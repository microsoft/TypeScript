// @noEmit: true
// @allowJs: true
// @checkJs: true
// @target: es6
// @lib: es6,dom
// @Filename: a.js
var my = my || {};
my.app = my.app || {};

my.app.Application = (function () {
var Application = function () {
    //...
};
return Application;
})();
my.app.Application()

// @Filename: b.js
var min = window.min || {};
min.app = min.app || {};

min.app.Application = (function () {
var Application = function () {
    //...
};
return Application;
})();
min.app.Application()

// TODO: Make sure to include github.com/chadbr/vscodeTestJS
// (though extracted to 4 js files instead of 2 js files and an html)
