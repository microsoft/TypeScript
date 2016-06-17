// @allowJs: true
// @filename: globaltag.js
// @out: dummy76.js
/**
    @global
    @constructor
 */
window.Bar = new Function('', a, b, c);

(function() {

    /** @global */
    var foo;

    foo = 'hello foo';

    this.foo = foo;

}).apply(window);