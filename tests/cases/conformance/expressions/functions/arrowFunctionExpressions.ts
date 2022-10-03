// ArrowFormalParameters => AssignmentExpression is equivalent to ArrowFormalParameters => { return AssignmentExpression; }
var a = (p: string) => p.length;
var a = (p: string) => { return p.length; }

// Identifier => Block is equivalent to(Identifier) => Block
var b = j => { return 0; }
var b = (j) => { return 0; }

// Identifier => AssignmentExpression is equivalent to(Identifier) => AssignmentExpression
var c: number;
var d = n => c = n;
var d = (n) => c = n;
var d: (n: any) => any;

// Binding patterns in arrow functions
var p1 = ([a]) => { };
var p2 = ([...a]) => { };
var p3 = ([, a]) => { };
var p4 = ([, ...a]) => { };
var p5 = ([a = 1]) => { };
var p6 = ({ a }) => { };
var p7 = ({ a: { b } }) => { };
var p8 = ({ a = 1 }) => { };
var p9 = ({ a: { b = 1 } = { b: 1 } }) => { };
var p10 = ([{ value, done }]) => { };

// Arrow function used in class member initializer
// Arrow function used in class member function
class MyClass {
    m = (n) => n + 1;
    p = (n) => n && this;

    fn() {
        var m = (n) => n + 1;
        var p = (n) => n && this;
    }
}

// Arrow function used in arrow function
var arrrr = () => (m: number) => () => (n: number) => m + n;
var e = arrrr()(3)()(4);
var e: number;

// Arrow function used in arrow function used in function
function someFn() {
    var arr = (n: number) => (p: number) => p * n;
    arr(3)(4).toExponential();
}

// Arrow function used in function
function someOtherFn() {
    var arr = (n: number) => '' + n;
    arr(4).charAt(0);
}

// Arrow function used in nested function in function
function outerFn() {
    function innerFn() {
        var arrowFn = () => { };
        var p = arrowFn();
        var p: void;
    }
}

// Arrow function used in nested function in arrow function
var f = (n: string) => {
    function fn(x: number) {
        return () => n + x;
    }
    return fn(4);
}
var g = f('')();
var g: string;


// Arrow function used in nested function in arrow function in nested function
function someOuterFn() {
    var arr = (n: string) => {
        function innerFn() {
            return () => n.length;
        }
        return innerFn;
    }
    return arr;
}
var h = someOuterFn()('')()();
h.toExponential();

// Arrow function used in try/catch/finally in function
function tryCatchFn() {
    try {
        var x = () => this;
    } catch (e) {
        var t = () => e + this;
    } finally {
        var m = () => this + '';
    }
}
