//// [genericClasses3.ts]
class B<T> {
    a: T;
    b: T;
}

class C<T> extends B<T> {
    public x: T;
}

var v2: C <string>;

var y = v2.x; // should be 'string'
var u = v2.a; // should be 'string'

var z = v2.b;



//// [genericClasses3.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var B = (function () {
    function B() {
    }
    return B;
})();

var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    return C;
})(B);

var v2;

var y = v2.x;
var u = v2.a;

var z = v2.b;


////[genericClasses3.d.ts]
declare class B<T> {
    public a: T;
    public b: T;
}
declare class C<T> extends B<T> {
    public x: T;
}
declare var v2: C<string>;
declare var y: string;
declare var u: string;
declare var z: string;
