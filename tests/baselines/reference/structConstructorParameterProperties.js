//// [structConstructorParameterProperties.ts]
// doc 3.1
// modifiers in parameter property declaration define accessibility for parameters

struct C {
    y: string;
    constructor(private x: string) { }
}

var c: C;
var r = c.y;
var r2 = c.x; // error, Property 'x' is private and only accessible within struct 'C'


/* struct D<T> {
    y: T;
    constructor(a: T, private x: T, protected z: T) { }
}

var d: D<string>;
var r = d.y;
var r2 = d.x; // error
var r3 = d.a; // error, Property 'a' does not exist on type 'D<string>'
var r4 = d.z; // error
*/


//// [structConstructorParameterProperties.js]
// doc 3.1
// modifiers in parameter property declaration define accessibility for parameters
var C = (function () {
    var _C = new TypedObject.StructType({
        y: TypedObject.string,
    });
    function _ctor(x) {
        this.x = x;
    }
    function C(x) {
        var obj = new _C();
        _ctor.call(obj ,);
        return obj;
    }
    C._TO = _C;
    return C;
})();
var c;
var r = c.y;
var r2 = c.x; // error, Property 'x' is private and only accessible within struct 'C'
/* struct D<T> {
    y: T;
    constructor(a: T, private x: T, protected z: T) { }
}

var d: D<string>;
var r = d.y;
var r2 = d.x; // error
var r3 = d.a; // error, Property 'a' does not exist on type 'D<string>'
var r4 = d.z; // error
*/
