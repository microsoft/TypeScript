// @noEmit: true
// @checkJs: true
// @allowJs: true
// @strict: true
// @Filename: file1.js

// this file _should_ be a global file
var GlobalThing = { x: 12 };

/**
 * @param {*} type 
 * @param {*} ctor
 * @param {*} exports
 */
function f(type, ctor, exports) {
    if (typeof exports !== "undefined") {
        exports["AST_" + type] = ctor;
    }
}

// @Filename: ref.js
GlobalThing.x
