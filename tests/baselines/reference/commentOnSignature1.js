//// [tests/cases/compiler/commentOnSignature1.ts] ////

//// [a.ts]
/*!=================
    Keep this pinned
   =================
*/

/*! Don't keep this pinned comment */
function foo(n: number): void;
// Don't keep this comment.
function foo(s: string): void;
function foo(a: any): void {
}

class c {
    // dont keep this comment
    constructor(a: string);
    /*! keep this pinned comment */
    constructor(a: number);
    constructor(a: any) {
    }

    // dont keep this comment
    foo(a: string);
    /*! keep this pinned comment */
    foo(a: number);
    foo(a: any) {
    }
}

//// [b.ts]
///<reference path='a.ts'/>
function foo2(n: number): void;
// Don't keep this comment.
function foo2(s: string): void;
function foo2(a: any): void {
}

//// [a.js]
/*!=================
    Keep this pinned
   =================
*/
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
function foo(a) {
}
var c = (function () {
    function c(a) {
    }
    c.prototype.foo = function (a) {
    };
    __names(c.prototype, ["foo"]);
    return c;
}());
//// [b.js]
///<reference path='a.ts'/>
function foo2(a) {
}
