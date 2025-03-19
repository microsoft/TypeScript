//// [tests/cases/compiler/primitiveMembers.ts] ////

//// [primitiveMembers.ts]
var x = 5;
var r = /yo/;
r.source;

x.toBAZ();
x.toString();

var n = 0;
var N: Number;

n = N;  // should not work, as 'number' has a different brand
N = n; // should work

var o: Object = {}
var f: Function = (x: string) => x.length;
var r2: RegExp = /./g;
var n2: Number = 34;
var s: String = "yo";
var b: Boolean = true;

var n3 = 5 || {};


class baz { public bar(): void { }; }
class foo extends baz { public bar(){ return undefined}; }



 



//// [primitiveMembers.js]
var x = 5;
var r = /yo/;
r.source;
x.toBAZ();
x.toString();
var n = 0;
var N;
n = N; // should not work, as 'number' has a different brand
N = n; // should work
var o = {};
var f = (x) => x.length;
var r2 = /./g;
var n2 = 34;
var s = "yo";
var b = true;
var n3 = 5 || {};
class baz {
    bar() { }
    ;
}
class foo extends baz {
    bar() { return undefined; }
    ;
}
