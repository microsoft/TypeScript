//// [parenthesizedContexualTyping1.ts]
function fun<T>(g: (x: T) => T, x: T): T;
function fun<T>(g: (x: T) => T, h: (y: T) => T, x: T): T;
function fun<T>(g: (x: T) => T, x: T): T {
    return g(x);
}

var a = fun(x => x, 10);
var b = fun((x => x), 10);
var c = fun(((x => x)), 10);
var d = fun((((x => x))), 10);

var e = fun(x => x, x => x, 10);
var f = fun((x => x), (x => x), 10);
var g = fun(((x => x)), ((x => x)), 10);
var h = fun((((x => x))), ((x => x)), 10);

// Ternaries in parens
var i = fun((Math.random() < 0.5 ? x => x : x => undefined), 10);
var j = fun((Math.random() < 0.5 ? (x => x) : (x => undefined)), 10);
var k = fun((Math.random() < 0.5 ? (x => x) : (x => undefined)), x => x, 10);
var l = fun(((Math.random() < 0.5 ? ((x => x)) : ((x => undefined)))), ((x => x)), 10);

var lambda1: (x: number) => number = x => x;
var lambda2: (x: number) => number = (x => x);

type ObjType = { x: (p: number) => string; y: (p: string) => number };
var obj1: ObjType = { x: x => (x, undefined), y: y => (y, undefined) };
var obj2: ObjType = ({ x: x => (x, undefined), y: y => (y, undefined) });

//// [parenthesizedContexualTyping1.js]
function fun(g, x) {
    return g(x);
}
var a = fun(function (x) { return x; }, 10);
var b = fun((function (x) { return x; }), 10);
var c = fun(((function (x) { return x; })), 10);
var d = fun((((function (x) { return x; }))), 10);
var e = fun(function (x) { return x; }, function (x) { return x; }, 10);
var f = fun((function (x) { return x; }), (function (x) { return x; }), 10);
var g = fun(((function (x) { return x; })), ((function (x) { return x; })), 10);
var h = fun((((function (x) { return x; }))), ((function (x) { return x; })), 10);
// Ternaries in parens
var i = fun((Math.random() < 0.5 ? function (x) { return x; } : function (x) { return undefined; }), 10);
var j = fun((Math.random() < 0.5 ? (function (x) { return x; }) : (function (x) { return undefined; })), 10);
var k = fun((Math.random() < 0.5 ? (function (x) { return x; }) : (function (x) { return undefined; })), function (x) { return x; }, 10);
var l = fun(((Math.random() < 0.5 ? ((function (x) { return x; })) : ((function (x) { return undefined; })))), ((function (x) { return x; })), 10);
var lambda1 = function (x) { return x; };
var lambda2 = (function (x) { return x; });
var obj1 = { x: function (x) { return (x, undefined); }, y: function (y) { return (y, undefined); } };
var obj2 = ({ x: function (x) { return (x, undefined); }, y: function (y) { return (y, undefined); } });
