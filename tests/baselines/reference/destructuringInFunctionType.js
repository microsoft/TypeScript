//// [destructuringInFunctionType.ts]
interface a { a }
interface b { b }
interface c { c }

type T1 = ([a, b, c]);
type F1 = ([a, b, c]) => void;

type T2 = ({ a });
type F2 = ({ a }) => void;

type T3 = ([{ a: b }, { b: a }]);
type F3 = ([{ a: b }, { b: a }]) => void;

type T4 = ([{ a: [b, c] }]);
type F4 = ([{ a: [b, c] }]) => void;

type C1 = new ([{ a: [b, c] }]) => void;

var v1 = ([a, b, c]) => "hello";
var v2: ([a, b, c]) => string;


//// [destructuringInFunctionType.js]
var v1 = function (_a) {
    var a = _a[0], b = _a[1], c = _a[2];
    return "hello";
};
var v2;


//// [destructuringInFunctionType.d.ts]
interface a {
    a: any;
}
interface b {
    b: any;
}
interface c {
    c: any;
}
declare type T1 = ([a, b, c]);
declare type F1 = ([a, b, c]: [any, any, any]) => void;
declare type T2 = ({
    a: any;
});
declare type F2 = ({ a }: {
    a: any;
}) => void;
declare type T3 = ([{
    a: b;
}, {
    b: a;
}]);
declare type F3 = ([{ a: b }, { b: a }]: [{
    a: any;
}, {
    b: any;
}]) => void;
declare type T4 = ([{
    a: [b, c];
}]);
declare type F4 = ([{ a: [b, c] }]: [{
    a: [any, any];
}]) => void;
declare type C1 = new ([{ a: [b, c] }]: [{
    a: [any, any];
}]) => void;
declare var v1: ([a, b, c]: [any, any, any]) => string;
declare var v2: ([a, b, c]: [any, any, any]) => string;
