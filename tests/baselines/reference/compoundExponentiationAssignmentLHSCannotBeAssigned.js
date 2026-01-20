//// [tests/cases/conformance/es7/exponentiationOperator/compoundExponentiationAssignmentLHSCannotBeAssigned.ts] ////

//// [compoundExponentiationAssignmentLHSCannotBeAssigned.ts]
enum E { a, b }

declare var a: any;
declare var b: void;

declare var x1: boolean;
x1 **= a;
x1 **= b;
x1 **= true;
x1 **= 0;
x1 **= ''
x1 **= E.a;
x1 **= {};
x1 **= null;
x1 **= undefined;

declare var x2: string;
x2 **= a;
x2 **= b;
x2 **= true;
x2 **= 0;
x2 **= ''
x2 **= E.a;
x2 **= {};
x2 **= null;
x2 **= undefined;

declare var x3: {};
x3 **= a;
x3 **= b;
x3 **= true;
x3 **= 0;
x3 **= ''
x3 **= E.a;
x3 **= {};
x3 **= null;
x3 **= undefined;

declare var x4: void;
x4 **= a;
x4 **= b;
x4 **= true;
x4 **= 0;
x4 **= ''
x4 **= E.a;
x4 **= {};
x4 **= null;
x4 **= undefined;

declare var x5: number;
x5 **= b;
x5 **= true;
x5 **= ''
x5 **= {};

declare var x6: E;
x6 **= b;
x6 **= true;
x6 **= ''
x6 **= {};

//// [compoundExponentiationAssignmentLHSCannotBeAssigned.js]
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E[E["b"] = 1] = "b";
})(E || (E = {}));
x1 = Math.pow(x1, a);
x1 = Math.pow(x1, b);
x1 = Math.pow(x1, true);
x1 = Math.pow(x1, 0);
x1 = Math.pow(x1, '');
x1 = Math.pow(x1, E.a);
x1 = Math.pow(x1, {});
x1 = Math.pow(x1, null);
x1 = Math.pow(x1, undefined);
x2 = Math.pow(x2, a);
x2 = Math.pow(x2, b);
x2 = Math.pow(x2, true);
x2 = Math.pow(x2, 0);
x2 = Math.pow(x2, '');
x2 = Math.pow(x2, E.a);
x2 = Math.pow(x2, {});
x2 = Math.pow(x2, null);
x2 = Math.pow(x2, undefined);
x3 = Math.pow(x3, a);
x3 = Math.pow(x3, b);
x3 = Math.pow(x3, true);
x3 = Math.pow(x3, 0);
x3 = Math.pow(x3, '');
x3 = Math.pow(x3, E.a);
x3 = Math.pow(x3, {});
x3 = Math.pow(x3, null);
x3 = Math.pow(x3, undefined);
x4 = Math.pow(x4, a);
x4 = Math.pow(x4, b);
x4 = Math.pow(x4, true);
x4 = Math.pow(x4, 0);
x4 = Math.pow(x4, '');
x4 = Math.pow(x4, E.a);
x4 = Math.pow(x4, {});
x4 = Math.pow(x4, null);
x4 = Math.pow(x4, undefined);
x5 = Math.pow(x5, b);
x5 = Math.pow(x5, true);
x5 = Math.pow(x5, '');
x5 = Math.pow(x5, {});
x6 = Math.pow(x6, b);
x6 = Math.pow(x6, true);
x6 = Math.pow(x6, '');
x6 = Math.pow(x6, {});
