//// [es6ClassTest7.ts]
declare module M {
    export class Foo {
    }
}

class Bar extends M.Foo {
}


//// [es6ClassTest7.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bar = (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        _super.apply(this, arguments);
    }
    return Bar;
})(M.Foo);
