// @noEmit: true
// @allowJs: true
// @checkJs: true
// @target: esnext
// @Filename: module.js
var Outer = Outer ?? {};
Outer.app = Outer.app ?? {};

// @Filename: someview.js
Outer.app.SomeView = (function () {
    var SomeView = function() {
        var me = this;
    }
    return SomeView;
})();
Outer.app.Inner = class {
    constructor() {
        /** @type {number} */
        this.y = 12;
    }
}
var example = new Outer.app.Inner();
example.y;
/** @param {number} k */
Outer.app.statische = function (k) {
    return k ** k;
}
// @Filename: application.js
Outer.app.Application = (function () {

    /**
     * Application main class.
     * Will be instantiated & initialized by HTML page
     */
    var Application = function () {
        var me = this;
        me.view = new Outer.app.SomeView();
    };
    return Application;
})();
// @Filename: main.js
var app = new Outer.app.Application();
var inner = new Outer.app.Inner();
inner.y;
/** @type {Outer.app.Inner} */
var x;
x.y;
Outer.app.statische(101); // Infinity, duh
