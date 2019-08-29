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

function bluergh(x: unknown) {
    if (isPrimitiveUnion(x)) {
        let a: number | string = x;
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
