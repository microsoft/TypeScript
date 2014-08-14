//// [contextualTyping.ts]
// DEFAULT INTERFACES
interface IFoo {
    n: number;
    s: string;
    f(i: number, s: string): string;
    a: number[];
}

interface IBar {
    foo: IFoo;
}

// CONTEXT: Class property declaration
class C1T5 {
    foo: (i: number, s: string) => number = function(i) {
        return i;
    }
}

// CONTEXT: Module property declaration
module C2T5 {
    export var foo: (i: number, s: string) => number = function(i) {
        return i;
    }
}

// CONTEXT: Variable declaration
var c3t1: (s: string) => string = (function(s) { return s });
var c3t2 = <IFoo>({
    n: 1
})
var c3t3: number[] = [];
var c3t4: () => IFoo = function() { return <IFoo>({}) };
var c3t5: (n: number) => IFoo = function(n) { return <IFoo>({}) };
var c3t6: (n: number, s: string) => IFoo = function(n, s) { return <IFoo>({}) };
var c3t7: {
    (n: number): number;    
    (s1: string): number;
} = function(n) { return n; };

var c3t8: (n: number, s: string) => number = function(n) { return n; };
var c3t9: number[][] = [[],[]];
var c3t10: IFoo[] = [<IFoo>({}),<IFoo>({})];
var c3t11: {(n: number, s: string): string;}[] = [function(n, s) { return s; }];
var c3t12: IBar = {
    foo: <IFoo>({})
}
var c3t13 = <IFoo>({
    f: function(i, s) { return s; }
})
var c3t14 = <IFoo>({
    a: []
})

// CONTEXT: Class property assignment
class C4T5 {
    foo: (i: number, s: string) => string;
    constructor() {
        this.foo = function(i, s) {
            return s;
        }
    }
}

// CONTEXT: Module property assignment
module C5T5 {
    export var foo: (i: number, s: string) => string;
    foo = function(i, s) {
        return s;
    }
}

// CONTEXT: Variable assignment
var c6t5: (n: number) => IFoo;
c6t5 = <(n: number) => IFoo>function(n) { return <IFoo>({}) };

// CONTEXT: Array index assignment
var c7t2: IFoo[];
c7t2[0] = <IFoo>({n: 1});

// CONTEXT: Object property assignment
interface IPlaceHolder {
    t1: (s: string) => string;
    t2: IFoo;
    t3: number[];
    t4: () => IFoo;
    t5: (n: number) => IFoo;
    t6: (n: number, s: string) => IFoo;
    t7: {
            (n: number, s: string): number;    
            //(s1: string, s2: string): number;
        };
    t8: (n: number, s: string) => number;
    t9: number[][];
    t10: IFoo[];
    t11: {(n: number, s: string): string;}[];
    t12: IBar;
    t13: IFoo;
    t14: IFoo;
    }

var objc8: {
    t1: (s: string) => string;
    t2: IFoo;
    t3: number[];
    t4: () => IFoo;
    t5: (n: number) => IFoo;
    t6: (n: number, s: string) => IFoo;
    t7: {
            (n: number, s: string): number;    
            //(s1: string, s2: string): number;
        };
    t8: (n: number, s: string) => number;
    t9: number[][];
    t10: IFoo[];
    t11: {(n: number, s: string): string;}[];
    t12: IBar;
    t13: IFoo;
    t14: IFoo;
} = <IPlaceHolder>({});

objc8.t1 = (function(s) { return s });
objc8.t2 = <IFoo>({
    n: 1
});
objc8.t3 = [];
objc8.t4 = function() { return <IFoo>({}) };
objc8.t5 = function(n) { return <IFoo>({}) };
objc8.t6 = function(n, s) { return <IFoo>({}) };
objc8.t7 = function(n: number) { return n };

objc8.t8 = function(n) { return n; };
objc8.t9 = [[],[]];
objc8.t10 = [<IFoo>({}),<IFoo>({})];
objc8.t11 = [function(n, s) { return s; }];
objc8.t12 = {
    foo: <IFoo>({})
}
objc8.t13 = <IFoo>({
    f: function(i, s) { return s; }
})
objc8.t14 = <IFoo>({
    a: []
})
// CONTEXT: Function call
function c9t5(f: (n: number) => IFoo) {};
c9t5(function(n) {
    return <IFoo>({});
});

// CONTEXT: Return statement
var c10t5: () => (n: number) => IFoo = function() { return function(n) { return <IFoo>({}) } };

// CONTEXT: Newing a class
class C11t5 { constructor(f: (n: number) => IFoo) { } };
var i = new C11t5(function(n) { return <IFoo>({}) });

// CONTEXT: Type annotated expression
var c12t1 = <(s: string) => string> (function(s) { return s });
var c12t2 = <IFoo> ({
    n: 1
});
var c12t3 = <number[]> [];
var c12t4 = <() => IFoo> function() { return <IFoo>({}) };
var c12t5 = <(n: number) => IFoo> function(n) { return <IFoo>({}) };
var c12t6 = <(n: number, s: string) => IFoo> function(n, s) { return <IFoo>({}) };
var c12t7 = <{
    (n: number, s: string): number;    
    //(s1: string, s2: string): number;
}> function(n:number) { return n };

var c12t8 = <(n: number, s: string) => number> function(n) { return n; };
var c12t9 = <number[][]> [[],[]];
var c12t10 = <IFoo[]> [<IFoo>({}),<IFoo>({})];
var c12t11 = <{(n: number, s: string): string;}[]> [function(n, s) { return s; }];
var c12t12 = <IBar> {
    foo: <IFoo>({})
}
var c12t13 = <IFoo> ({
    f: function(i, s) { return s; }
})
var c12t14 = <IFoo> ({
    a: []
})

// CONTEXT: Contextual typing declarations

// contextually typing function declarations
declare function EF1(a:number, b:number):number;

function EF1(a,b) { return a+b; }

var efv = EF1(1,2);


// contextually typing from ambient class declarations
declare class Point
{
      constructor(x: number, y: number);
      x: number;
      y: number;
      add(dx: number, dy: number): Point;
      static origin: Point;

}

function Point(x, y) {
    this.x = x;
    this.y = y;

    return this;
}

Point.origin = new Point(0, 0);

Point.prototype.add = function(dx, dy) {
    return new Point(this.x + dx, this.y + dy);
};

Point.prototype = {
    x: 0,
    y: 0,
    add: function(dx, dy) {
        return new Point(this.x + dx, this.y + dy);
    }
};

interface A { x: string; }
interface B extends A { }
var x: B = { };


//// [contextualTyping.js]
// CONTEXT: Class property declaration\nvar C1T5 = (function () {\n    function C1T5() {\n        this.foo = function (i) {\n            return i;\n        };\n    }\n    return C1T5;\n})();\nvar C2T5;\n(function (C2T5) {\n    C2T5.foo = function (i) {\n        return i;\n    };\n})(C2T5 || (C2T5 = {}));\n// CONTEXT: Variable declaration\nvar c3t1 = (function (s) {\n    return s;\n});\nvar c3t2 = ({\n    n: 1\n});\nvar c3t3 = [];\nvar c3t4 = function () {\n    return ({});\n};\nvar c3t5 = function (n) {\n    return ({});\n};\nvar c3t6 = function (n, s) {\n    return ({});\n};\nvar c3t7 = function (n) {\n    return n;\n};\nvar c3t8 = function (n) {\n    return n;\n};\nvar c3t9 = [[], []];\nvar c3t10 = [({}), ({})];\nvar c3t11 = [function (n, s) {\n    return s;\n}];\nvar c3t12 = {\n    foo: ({})\n};\nvar c3t13 = ({\n    f: function (i, s) {\n        return s;\n    }\n});\nvar c3t14 = ({\n    a: []\n});\n// CONTEXT: Class property assignment\nvar C4T5 = (function () {\n    function C4T5() {\n        this.foo = function (i, s) {\n            return s;\n        };\n    }\n    return C4T5;\n})();\nvar C5T5;\n(function (C5T5) {\n    C5T5.foo;\n    C5T5.foo = function (i, s) {\n        return s;\n    };\n})(C5T5 || (C5T5 = {}));\n// CONTEXT: Variable assignment\nvar c6t5;\nc6t5 = function (n) {\n    return ({});\n};\n// CONTEXT: Array index assignment\nvar c7t2;\nc7t2[0] = ({ n: 1 });\nvar objc8 = ({});\nobjc8.t1 = (function (s) {\n    return s;\n});\nobjc8.t2 = ({\n    n: 1\n});\nobjc8.t3 = [];\nobjc8.t4 = function () {\n    return ({});\n};\nobjc8.t5 = function (n) {\n    return ({});\n};\nobjc8.t6 = function (n, s) {\n    return ({});\n};\nobjc8.t7 = function (n) {\n    return n;\n};\nobjc8.t8 = function (n) {\n    return n;\n};\nobjc8.t9 = [[], []];\nobjc8.t10 = [({}), ({})];\nobjc8.t11 = [function (n, s) {\n    return s;\n}];\nobjc8.t12 = {\n    foo: ({})\n};\nobjc8.t13 = ({\n    f: function (i, s) {\n        return s;\n    }\n});\nobjc8.t14 = ({\n    a: []\n});\n// CONTEXT: Function call\nfunction c9t5(f) {\n}\n;\nc9t5(function (n) {\n    return ({});\n});\n// CONTEXT: Return statement\nvar c10t5 = function () {\n    return function (n) {\n        return ({});\n    };\n};\n// CONTEXT: Newing a class\nvar C11t5 = (function () {\n    function C11t5(f) {\n    }\n    return C11t5;\n})();\n;\nvar i = new C11t5(function (n) {\n    return ({});\n});\n// CONTEXT: Type annotated expression\nvar c12t1 = (function (s) {\n    return s;\n});\nvar c12t2 = ({\n    n: 1\n});\nvar c12t3 = [];\nvar c12t4 = function () {\n    return ({});\n};\nvar c12t5 = function (n) {\n    return ({});\n};\nvar c12t6 = function (n, s) {\n    return ({});\n};\nvar c12t7 = function (n) {\n    return n;\n};\nvar c12t8 = function (n) {\n    return n;\n};\nvar c12t9 = [[], []];\nvar c12t10 = [({}), ({})];\nvar c12t11 = [function (n, s) {\n    return s;\n}];\nvar c12t12 = {\n    foo: ({})\n};\nvar c12t13 = ({\n    f: function (i, s) {\n        return s;\n    }\n});\nvar c12t14 = ({\n    a: []\n});\nfunction EF1(a, b) {\n    return a + b;\n}\nvar efv = EF1(1, 2);\nfunction Point(x, y) {\n    this.x = x;\n    this.y = y;\n    return this;\n}\nPoint.origin = new Point(0, 0);\nPoint.prototype.add = function (dx, dy) {\n    return new Point(this.x + dx, this.y + dy);\n};\nPoint.prototype = {\n    x: 0,\n    y: 0,\n    add: function (dx, dy) {\n        return new Point(this.x + dx, this.y + dy);\n    }\n};\nvar x = {};\n//# sourceMappingURL=contextualTyping.js.map