//// [primtiveTypesAreIdentical.ts]
// primitive types are identical to themselves so these overloads will all cause errors

function foo1(x: number);
function foo1(x: number);
function foo1(x: any) { }

function foo2(x: string);
function foo2(x: string);
function foo2(x: any) { }

function foo3(x: boolean);
function foo3(x: boolean);
function foo3(x: any) { }

function foo4(x: any);
function foo4(x: any);
function foo4(x: any) { }

function foo5(x: 'a');
function foo5(x: 'a');
function foo5(x: string);
function foo5(x: any) { }

enum E { A }
function foo6(x: E);
function foo6(x: E);
function foo6(x: any) { }

function foo7(x: void);
function foo7(x: void);
function foo7(x: any) { }

//// [primtiveTypesAreIdentical.js]
// primitive types are identical to themselves so these overloads will all cause errors
function foo1(x) { }
function foo2(x) { }
function foo3(x) { }
function foo4(x) { }
function foo5(x) { }
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
function foo6(x) { }
function foo7(x) { }
