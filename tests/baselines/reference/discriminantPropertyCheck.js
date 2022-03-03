//// [discriminantPropertyCheck.ts]
type Item = Item1 | Item2;

interface Base {
    bar: boolean;
}

interface Item1 extends Base {
    kind: "A";
    foo: string | undefined;
    baz: boolean;
    qux: true;
}

interface Item2 extends Base {
    kind: "B";
    foo: string | undefined;
    baz: boolean;
    qux: false;
}

function goo1(x: Item) {
    if (x.kind === "A" && x.foo !== undefined) {
        x.foo.length;
    }
}

function goo2(x: Item) {
    if (x.foo !== undefined && x.kind === "A") {
        x.foo.length;  // Error, intervening discriminant guard
    }
}

function foo1(x: Item) {
    if (x.bar && x.foo !== undefined) {
        x.foo.length;
    }
}

function foo2(x: Item) {
    if (x.foo !== undefined && x.bar) {
        x.foo.length;
    }
}

function foo3(x: Item) {
    if (x.baz && x.foo !== undefined) {
        x.foo.length;
    }
}

function foo4(x: Item) {
    if (x.foo !== undefined && x.baz) {
        x.foo.length;
    }
}

function foo5(x: Item) {
    if (x.qux && x.foo !== undefined) {
        x.foo.length;
    }
}

function foo6(x: Item) {
    if (x.foo !== undefined && x.qux) {
        x.foo.length;  // Error, intervening discriminant guard
    }
}

// Repro from #27493

enum Types { Str = 1, Num = 2 }

type Instance = StrType | NumType;

interface StrType {
    type: Types.Str;
    value: string;
    length: number;
}

interface NumType {
    type: Types.Num;
    value: number;
}

function func2(inst: Instance) {
    while (true) {
        switch (inst.type) {
            case Types.Str: {
                inst.value.length;
                break;
            }
            case Types.Num: {
                inst.value.toExponential;
                break;
            }
        }
    }
}

// Repro from #29106

const f = (_a: string, _b: string): void => {};

interface A {
  a?: string;
  b?: string;
}

interface B {
  a: string;
  b: string;
}

type U = A | B;

const u: U = {} as any;

u.a && u.b && f(u.a, u.b);

u.b && u.a && f(u.a, u.b);

// Repro from #29012

type Additive = '+' | '-';
type Multiplicative = '*' | '/';

interface AdditiveObj {
    key: Additive
}

interface MultiplicativeObj {
    key: Multiplicative
}

type Obj = AdditiveObj | MultiplicativeObj

export function foo(obj: Obj) {
    switch (obj.key) {
        case '+': {
            onlyPlus(obj.key);
            return;
        }
    }
}

function onlyPlus(arg: '+') {
  return arg;
}

// Repro from #29496

declare function never(value: never): never;

const enum BarEnum {
    bar1 = 1,
    bar2 = 2,
}

type UnionOfBar = TypeBar1 | TypeBar2;
type TypeBar1 = { type: BarEnum.bar1 };
type TypeBar2 = { type: BarEnum.bar2 };

function func3(value: Partial<UnionOfBar>) {
    if (value.type !== undefined) {
        switch (value.type) {
            case BarEnum.bar1:
                break;
            case BarEnum.bar2:
                break;
            default:
                never(value.type);
        }
    }
}

// Repro from #30557

interface TypeA {
    Name: "TypeA";
    Value1: "Cool stuff!";
}

interface TypeB {
    Name: "TypeB";
    Value2: 0;
}

type Type = TypeA | TypeB;

declare function isType(x: unknown): x is Type;

function WorksProperly(data: Type) {
    if (data.Name === "TypeA") {
        const value1 = data.Value1;
    }
}

function DoesNotWork(data: unknown) {
    if (isType(data)) {
        if (data.Name === "TypeA") {
            const value1 = data.Value1;
        }
    }
}

// Repro from #36777

type TestA = {
    type: 'testA';
    bananas: 3;
}
  
type TestB = {
    type: 'testB';
    apples: 5;
}
  
type AllTests = TestA | TestB;

type MapOfAllTests = Record<string, AllTests>;

const doTestingStuff = (mapOfTests: MapOfAllTests, ids: string[]) => {
    ids.forEach(id => {
        let test;
        test = mapOfTests[id];
        if (test.type === 'testA') {
            console.log(test.bananas);
        }
        switch (test.type) {
            case 'testA': {
                console.log(test.bananas);
            }
        }
    });
};


//// [discriminantPropertyCheck.js]
"use strict";
exports.__esModule = true;
exports.foo = void 0;
function goo1(x) {
    if (x.kind === "A" && x.foo !== undefined) {
        x.foo.length;
    }
}
function goo2(x) {
    if (x.foo !== undefined && x.kind === "A") {
        x.foo.length; // Error, intervening discriminant guard
    }
}
function foo1(x) {
    if (x.bar && x.foo !== undefined) {
        x.foo.length;
    }
}
function foo2(x) {
    if (x.foo !== undefined && x.bar) {
        x.foo.length;
    }
}
function foo3(x) {
    if (x.baz && x.foo !== undefined) {
        x.foo.length;
    }
}
function foo4(x) {
    if (x.foo !== undefined && x.baz) {
        x.foo.length;
    }
}
function foo5(x) {
    if (x.qux && x.foo !== undefined) {
        x.foo.length;
    }
}
function foo6(x) {
    if (x.foo !== undefined && x.qux) {
        x.foo.length; // Error, intervening discriminant guard
    }
}
// Repro from #27493
var Types;
(function (Types) {
    Types[Types["Str"] = 1] = "Str";
    Types[Types["Num"] = 2] = "Num";
})(Types || (Types = {}));
function func2(inst) {
    while (true) {
        switch (inst.type) {
            case Types.Str: {
                inst.value.length;
                break;
            }
            case Types.Num: {
                inst.value.toExponential;
                break;
            }
        }
    }
}
// Repro from #29106
var f = function (_a, _b) { };
var u = {};
u.a && u.b && f(u.a, u.b);
u.b && u.a && f(u.a, u.b);
function foo(obj) {
    switch (obj.key) {
        case '+': {
            onlyPlus(obj.key);
            return;
        }
    }
}
exports.foo = foo;
function onlyPlus(arg) {
    return arg;
}
function func3(value) {
    if (value.type !== undefined) {
        switch (value.type) {
            case 1 /* bar1 */:
                break;
            case 2 /* bar2 */:
                break;
            default:
                never(value.type);
        }
    }
}
function WorksProperly(data) {
    if (data.Name === "TypeA") {
        var value1 = data.Value1;
    }
}
function DoesNotWork(data) {
    if (isType(data)) {
        if (data.Name === "TypeA") {
            var value1 = data.Value1;
        }
    }
}
var doTestingStuff = function (mapOfTests, ids) {
    ids.forEach(function (id) {
        var test;
        test = mapOfTests[id];
        if (test.type === 'testA') {
            console.log(test.bananas);
        }
        switch (test.type) {
            case 'testA': {
                console.log(test.bananas);
            }
        }
    });
};
