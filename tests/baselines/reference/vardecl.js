//// [vardecl.ts]
var simpleVar;

var anotherVar: any;
var varWithSimpleType: number;
var varWithArrayType: number[];

var varWithInitialValue = 30;

var withComplicatedValue = { x: 30, y: 70, desc: "position" };

declare var declaredVar;
declare var declareVar2

declare var declaredVar3;
declare var deckareVarWithType: number;

var arrayVar: string[] = ['a', 'b'];

var complicatedArrayVar: { x: number; y: string; }[] ;
complicatedArrayVar.push({ x: 30, y : 'hello world' });

var n1: { [s: string]: number; };

var c : {
        new? (): any;
    }

var d: {
    foo? (): {
        x: number;
    };
}

var d3: {
    foo(): {
        x: number;
        y: number;
    };
}

var d2: {
    foo (): {
        x: number;
    };
}

var n2: {
    (): void;
}
var n4: {
    (): void;
}[];

var d4: {
    foo(n: string, x: { x: number; y: number; }): {
        x: number;
        y: number;
    };
}

module m2 {

    export var a, b2: number = 10, b;
    var m1;
    var a2, b22: number = 10, b222;
    var m3;

    class C {
        constructor (public b) {
        }
    }

    export class C2 {
        constructor (public b) {
        }
    }
    var m;
    declare var d1, d2;
    var b23;
    declare var v1;
    export var mE;
    export declare var d1E, d2E;
    export var b2E;
    export declare var v1E;
}

var a22, b22 = 10, c22 = 30;
var nn;

declare var da1, da2;
var normalVar;
declare var dv1;
var xl;
var x;
var z;

function foo(a2) {
    var a = 10;
}

for (var i = 0, j = 0; i < 10; i++) {
    j++;
}


for (var k = 0; k < 30; k++) {
    k++;
}
var b = 10;


//// [vardecl.js]
var simpleVar;
var anotherVar;
var varWithSimpleType;
var varWithArrayType;
var varWithInitialValue = 30;
var withComplicatedValue = { x: 30, y: 70, desc: "position" };
var arrayVar = ['a', 'b'];
var complicatedArrayVar;
complicatedArrayVar.push({ x: 30, y: 'hello world' });
var n1;
var c;
var d;
var d3;
var d2;
var n2;
var n4;
var d4;
var m2;
(function (m2) {
    m2.b2 = 10;
    var m1;
    var a2, b22 = 10, b222;
    var m3;
    var C = /** @class */ (function () {
        function C(b) {
            this.b = b;
        }
        return C;
    }());
    var C2 = /** @class */ (function () {
        function C2(b) {
            this.b = b;
        }
        return C2;
    }());
    m2.C2 = C2;
    var m;
    var b23;
})(m2 || (m2 = {}));
var a22, b22 = 10, c22 = 30;
var nn;
var normalVar;
var xl;
var x;
var z;
function foo(a2) {
    var a = 10;
}
for (var i = 0, j = 0; i < 10; i++) {
    j++;
}
for (var k = 0; k < 30; k++) {
    k++;
}
var b = 10;


//// [vardecl.d.ts]
declare var simpleVar: any;
declare var anotherVar: any;
declare var varWithSimpleType: number;
declare var varWithArrayType: number[];
declare var varWithInitialValue: number;
declare var withComplicatedValue: {
    x: number;
    y: number;
    desc: string;
};
declare var declaredVar: any;
declare var declareVar2: any;
declare var declaredVar3: any;
declare var deckareVarWithType: number;
declare var arrayVar: string[];
declare var complicatedArrayVar: {
    x: number;
    y: string;
}[];
declare var n1: {
    [s: string]: number;
};
declare var c: {
    new?(): any;
};
declare var d: {
    foo?(): {
        x: number;
    };
};
declare var d3: {
    foo(): {
        x: number;
        y: number;
    };
};
declare var d2: {
    foo(): {
        x: number;
    };
};
declare var n2: {
    (): void;
};
declare var n4: {
    (): void;
}[];
declare var d4: {
    foo(n: string, x: {
        x: number;
        y: number;
    }): {
        x: number;
        y: number;
    };
};
declare module m2 {
    var a: any, b2: number, b: any;
    class C2 {
        b: any;
        constructor(b: any);
    }
    var mE: any;
    var d1E: any, d2E: any;
    var b2E: any;
    var v1E: any;
}
declare var a22: any, b22: number, c22: number;
declare var nn: any;
declare var da1: any, da2: any;
declare var normalVar: any;
declare var dv1: any;
declare var xl: any;
declare var x: any;
declare var z: any;
declare function foo(a2: any): void;
declare var b: number;
