//// [parenthesizedContexualTyping2.ts]
// These tests ensure that in cases where it may *appear* that a value has a type,
// they actually are properly being contextually typed. The way we test this is
// that we invoke contextually typed arguments with type arguments.
// Since 'any' cannot be invoked with type arguments, we should get errors
// back if contextual typing is not taking effect.

type FuncType = (x: <T>(p: T) => T) => typeof x;

function fun<T>(f: FuncType, x: T): T;
function fun<T>(f: FuncType, g: FuncType, x: T): T;
function fun<T>(...rest: any[]): T {
    return undefined;
}

var a = fun(x => { x<number>(undefined); return x; }, 10);
var b = fun((x => { x<number>(undefined); return x; }), 10);
var c = fun(((x => { x<number>(undefined); return x; })), 10);
var d = fun((((x => { x<number>(undefined); return x; }))), 10);

var e = fun(x => { x<number>(undefined); return x; }, x => { x<number>(undefined); return x; }, 10);
var f = fun((x => { x<number>(undefined); return x; }),(x => { x<number>(undefined); return x; }), 10);
var g = fun(((x => { x<number>(undefined); return x; })),((x => { x<number>(undefined); return x; })), 10);
var h = fun((((x => { x<number>(undefined); return x; }))),((x => { x<number>(undefined); return x; })), 10);

// Ternaries in parens
var i = fun((Math.random() < 0.5 ? x => { x<number>(undefined); return x; } : x => undefined), 10);
var j = fun((Math.random() < 0.5 ? (x => { x<number>(undefined); return x; }) : (x => undefined)), 10);
var k = fun((Math.random() < 0.5 ? (x => { x<number>(undefined); return x; }) : (x => undefined)), x => { x<number>(undefined); return x; }, 10);
var l = fun(((Math.random() < 0.5 ? ((x => { x<number>(undefined); return x; })) : ((x => undefined)))),((x => { x<number>(undefined); return x; })), 10);

var lambda1: FuncType = x => { x<number>(undefined); return x; };
var lambda2: FuncType = (x => { x<number>(undefined); return x; });

type ObjType = { x: (p: number) => string; y: (p: string) => number };
var obj1: ObjType = { x: x => (x, undefined), y: y => (y, undefined) };
var obj2: ObjType = ({ x: x => (x, undefined), y: y => (y, undefined) });

//// [parenthesizedContexualTyping2.js]
// These tests ensure that in cases where it may *appear* that a value has a type,
// they actually are properly being contextually typed. The way we test this is
// that we invoke contextually typed arguments with type arguments.
// Since 'any' cannot be invoked with type arguments, we should get errors
// back if contextual typing is not taking effect.
function fun() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    return undefined;
}
var a = fun(function (x) { x(undefined); return x; }, 10);
var b = fun((function (x) { x(undefined); return x; }), 10);
var c = fun(((function (x) { x(undefined); return x; })), 10);
var d = fun((((function (x) { x(undefined); return x; }))), 10);
var e = fun(function (x) { x(undefined); return x; }, function (x) { x(undefined); return x; }, 10);
var f = fun((function (x) { x(undefined); return x; }), (function (x) { x(undefined); return x; }), 10);
var g = fun(((function (x) { x(undefined); return x; })), ((function (x) { x(undefined); return x; })), 10);
var h = fun((((function (x) { x(undefined); return x; }))), ((function (x) { x(undefined); return x; })), 10);
// Ternaries in parens
var i = fun((Math.random() < 0.5 ? function (x) { x(undefined); return x; } : function (x) { return undefined; }), 10);
var j = fun((Math.random() < 0.5 ? (function (x) { x(undefined); return x; }) : (function (x) { return undefined; })), 10);
var k = fun((Math.random() < 0.5 ? (function (x) { x(undefined); return x; }) : (function (x) { return undefined; })), function (x) { x(undefined); return x; }, 10);
var l = fun(((Math.random() < 0.5 ? ((function (x) { x(undefined); return x; })) : ((function (x) { return undefined; })))), ((function (x) { x(undefined); return x; })), 10);
var lambda1 = function (x) { x(undefined); return x; };
var lambda2 = (function (x) { x(undefined); return x; });
var obj1 = { x: function (x) { return (x, undefined); }, y: function (y) { return (y, undefined); } };
var obj2 = ({ x: function (x) { return (x, undefined); }, y: function (y) { return (y, undefined); } });
