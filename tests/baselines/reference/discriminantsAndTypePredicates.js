//// [discriminantsAndTypePredicates.ts]
// Repro from #10145

interface A { type: 'A' }
interface B { type: 'B' }

function isA(x: A | B): x is A { return x.type === 'A'; }
function isB(x: A | B): x is B { return x.type === 'B'; }

function foo1(x: A | B): any {
    x;  // A | B
    if (isA(x)) {
        return x;  // A
    }
    x;  // B
    if (isB(x)) {
        return x;  // B
    }
    x;  // never
}

function foo2(x: A | B): any {
    x;  // A | B
    if (x.type === 'A') {
        return x;  // A
    }
    x;  // B
    if (x.type === 'B') {
        return x;  // B
    }
    x;  // never
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
        // TypeA
        const value1 = data.Value1;
    }
}

function DoesNotWork(data: unknown) {
    if (isType(data)) {
        if (data.Name === "TypeA") {
            // TypeA
            const value1 = data.Value1;
        }
    }
}

function narrowToNever(data: Type): "Cool stuff!" | 0 {
    if (data.Name === "TypeA") {
        return data.Value1;
    }
    if (data.Name === "TypeB") {
        return data.Value2;
    }
    return data;
}

function narrowToNeverUnknown(data: unknown): "Cool stuff!" | 0 {
    if (isType(data)) {
        if (data.Name === "TypeA") {
            return data.Value1;
        }
        if (data.Name === "TypeB") {
            return data.Value2;
        }
        return data;
    }
    throw "error";
}

type Foo = { kind: "a", a: number } | { kind: "b", b: number };
type Bar = { kind: "c", c: number } | { kind: "d", d: number };

declare function isFoo(x: unknown): x is Foo;
declare function isBar(x: unknown): x is Bar;

function blah(x: unknown) {
    if (isFoo(x)) {
        if (x.kind === "a") {
            let a = x.a;
        }
        else if (x.kind === "b") {
            let b = x.b;
        }
    }
    else if (isBar(x)) {
        if (x.kind === "c") {
            let c = x.c;
        }
        else if (x.kind === "d") {
            let d = x.d;
        }
    }
    x  // unknown
}

type PrimitiveUnion = number | string
type FooComplex = { kind: "a", a: number } | { kind: "b", b: number } | number;
type BarComplex = { kind: "c", c: number } | { kind: "d", d: number } | string;

declare function isPrimitiveUnion(x: unknown): x is PrimitiveUnion;
declare function isFooComplex(x: unknown): x is FooComplex;
declare function isBarComplex(x: unknown): x is BarComplex;
declare function isZZYYComplex(x: unknown): x is { kind: "z"; zzz: string } | { kind: "y", yyy: number };

function earlyExitsAndStuff(x: unknown) {
    if (!isFooComplex(x) && !isBarComplex(x)) {
        if (isZZYYComplex(x)) {
            if (x.kind !== "z") {
                return x.yyy;
            }
            return x.zzz;
        }
        return;
    }
    if (!!isPrimitiveUnion(x)) {
        return x;
    }
    if (!isZZYYComplex(x)) {
        if (x.kind === "a") {
            let a = x.a;
        }
        if (x.kind === "b") {
            let b = x.b;
        }
        if (x.kind === "c") {
            let c = x.c;
        }
        if (x.kind === "d") {
            let d = x.d;
        }
    }
}

function bluergh(x: unknown) {
    if (isPrimitiveUnion(x)) {
        let a: number | string = x;
        return;
    }
    if (isFooComplex(x) && typeof x === "object") {
        if (x.kind === "a") {
            let a = x.a;
        }
        else if (x.kind === "b") {
            let b = x.b;
        }
    }
    if (isPrimitiveUnion(x)) {
        let a: number | string = x;
    }
    if (isBarComplex(x) && typeof x === "object") {
        if (x.kind === "c") {
            let c = x.c;
        }
        else if (x.kind === "d") {
            let d = x.d;
        }
    }
    if (isPrimitiveUnion(x)) {
        let a: number | string = x;
    }
    x  // unknown
}

type A1 = { x: number };
type B1 = A1 & { kind: "B"; y: number };
type C1 = A1 & { kind: "C"; z: number };

function isBorC(a: A1): a is B1 | C1 {
    return (a as any).kind === "B" || (a as any).kind === "C";
}

function isB1(a: A1): a is B1 {
    return (a as any).kind === "B";
}

function isC1(a: A1): a is C1 {
    return (a as any).kind === "C";
}

function fn1(a: A1) {
    if (isBorC(a)) {
        if (a.kind === "B") {
            a.y;
        }
    }
}

function fn2(a: A1) {
    if (!isB1(a)) {
        return;
    }
    if (!isC1(a)) {
        if (a.kind === "B") {
            a.y;
        }
        return;
    }
    if (a.kind === "B") {
        a.y;
    }
}

declare function isTypeAB(x: unknown): x is { kind1: 'a', a: 1 } | { kind1: 'b', b: 2 };
declare function isTypeCD(x: unknown): x is { kind2: 'c', c: 3 } | { kind2: 'd', d: 4 };

function testComposition(x: unknown) {
    if (isTypeAB(x)) {
        if (x.kind1 === 'a') {
            x.a;
        }
        return;
    }
    if (x.kind1 === 'a') {
        x.a;  // Error
    }
    if (isTypeCD(x)) {
        if (x.kind2 === 'c') {
            x.c;
        }
        return;
    }
    if (x.kind2 === 'c') {
        x.c;  // Error
    }
    if (isTypeAB(x)) {
        if (isTypeCD(x)) {
            if (x.kind1 === 'a') {
                x.a;
            }
            if (x.kind2 === 'c') {
                x.c;
            }
        }
    }
}

function looper(getter: () => unknown) {
    let x = getter();
    while (isTypeAB(x)) {
        if (isTypeCD(x)) {
            if (x.kind1 === 'a') {
                x.a;
            }
            if (x.kind2 === 'c') {
                x.c;
            }
        }
        if (x.kind1 === 'a') {
            x.a;
        }
        if (x.kind2 === 'c') {
            x.c; // Error
        }
    }
    if (x.kind1 === 'a') {
        x.a;  // error
    }
}


//// [discriminantsAndTypePredicates.js]
// Repro from #10145
function isA(x) { return x.type === 'A'; }
function isB(x) { return x.type === 'B'; }
function foo1(x) {
    x; // A | B
    if (isA(x)) {
        return x; // A
    }
    x; // B
    if (isB(x)) {
        return x; // B
    }
    x; // never
}
function foo2(x) {
    x; // A | B
    if (x.type === 'A') {
        return x; // A
    }
    x; // B
    if (x.type === 'B') {
        return x; // B
    }
    x; // never
}
function WorksProperly(data) {
    if (data.Name === "TypeA") {
        // TypeA
        var value1 = data.Value1;
    }
}
function DoesNotWork(data) {
    if (isType(data)) {
        if (data.Name === "TypeA") {
            // TypeA
            var value1 = data.Value1;
        }
    }
}
function narrowToNever(data) {
    if (data.Name === "TypeA") {
        return data.Value1;
    }
    if (data.Name === "TypeB") {
        return data.Value2;
    }
    return data;
}
function narrowToNeverUnknown(data) {
    if (isType(data)) {
        if (data.Name === "TypeA") {
            return data.Value1;
        }
        if (data.Name === "TypeB") {
            return data.Value2;
        }
        return data;
    }
    throw "error";
}
function blah(x) {
    if (isFoo(x)) {
        if (x.kind === "a") {
            var a = x.a;
        }
        else if (x.kind === "b") {
            var b = x.b;
        }
    }
    else if (isBar(x)) {
        if (x.kind === "c") {
            var c = x.c;
        }
        else if (x.kind === "d") {
            var d = x.d;
        }
    }
    x; // unknown
}
function earlyExitsAndStuff(x) {
    if (!isFooComplex(x) && !isBarComplex(x)) {
        if (isZZYYComplex(x)) {
            if (x.kind !== "z") {
                return x.yyy;
            }
            return x.zzz;
        }
        return;
    }
    if (!!isPrimitiveUnion(x)) {
        return x;
    }
    if (!isZZYYComplex(x)) {
        if (x.kind === "a") {
            var a = x.a;
        }
        if (x.kind === "b") {
            var b = x.b;
        }
        if (x.kind === "c") {
            var c = x.c;
        }
        if (x.kind === "d") {
            var d = x.d;
        }
    }
}
function bluergh(x) {
    if (isPrimitiveUnion(x)) {
        var a = x;
        return;
    }
    if (isFooComplex(x) && typeof x === "object") {
        if (x.kind === "a") {
            var a = x.a;
        }
        else if (x.kind === "b") {
            var b = x.b;
        }
    }
    if (isPrimitiveUnion(x)) {
        var a = x;
    }
    if (isBarComplex(x) && typeof x === "object") {
        if (x.kind === "c") {
            var c = x.c;
        }
        else if (x.kind === "d") {
            var d = x.d;
        }
    }
    if (isPrimitiveUnion(x)) {
        var a = x;
    }
    x; // unknown
}
function isBorC(a) {
    return a.kind === "B" || a.kind === "C";
}
function isB1(a) {
    return a.kind === "B";
}
function isC1(a) {
    return a.kind === "C";
}
function fn1(a) {
    if (isBorC(a)) {
        if (a.kind === "B") {
            a.y;
        }
    }
}
function fn2(a) {
    if (!isB1(a)) {
        return;
    }
    if (!isC1(a)) {
        if (a.kind === "B") {
            a.y;
        }
        return;
    }
    if (a.kind === "B") {
        a.y;
    }
}
function testComposition(x) {
    if (isTypeAB(x)) {
        if (x.kind1 === 'a') {
            x.a;
        }
        return;
    }
    if (x.kind1 === 'a') {
        x.a; // Error
    }
    if (isTypeCD(x)) {
        if (x.kind2 === 'c') {
            x.c;
        }
        return;
    }
    if (x.kind2 === 'c') {
        x.c; // Error
    }
    if (isTypeAB(x)) {
        if (isTypeCD(x)) {
            if (x.kind1 === 'a') {
                x.a;
            }
            if (x.kind2 === 'c') {
                x.c;
            }
        }
    }
}
function looper(getter) {
    var x = getter();
    while (isTypeAB(x)) {
        if (isTypeCD(x)) {
            if (x.kind1 === 'a') {
                x.a;
            }
            if (x.kind2 === 'c') {
                x.c;
            }
        }
        if (x.kind1 === 'a') {
            x.a;
        }
        if (x.kind2 === 'c') {
            x.c; // Error
        }
    }
    if (x.kind1 === 'a') {
        x.a; // error
    }
}
