//// [tests/cases/compiler/narrowingByTypeofInSwitch.ts] ////

//// [narrowingByTypeofInSwitch.ts]
function assertNever(x: never) {
    return x;
}

function assertNumber(x: number) {
    return x;
}

function assertBoolean(x: boolean) {
    return x;
}

function assertString(x: string) {
    return x;
}

function assertSymbol(x: symbol) {
    return x;
}

function assertFunction(x: Function) {
    return x;
}

function assertObject(x: object) {
    return x;
}

function assertObjectOrNull(x: object | null) {
    return x;
}

function assertUndefined(x: undefined) {
    return x;
}

function assertAll(x: Basic) {
    return x;
}

function assertStringOrNumber(x: string | number) {
    return x;
}

function assertBooleanOrObject(x: boolean | object) {
    return x;
}

type Basic = number | boolean | string | symbol | object | Function | undefined;

function testUnion(x: Basic) {
    switch (typeof x) {
        case 'number': assertNumber(x); return;
        case 'boolean': assertBoolean(x); return;
        case 'function': assertFunction(x); return;
        case 'symbol': assertSymbol(x); return;
        case 'object': assertObject(x); return;
        case 'string': assertString(x); return;
        case 'undefined': assertUndefined(x); return;
    }
    assertNever(x);
}

function testExtendsUnion<T extends Basic>(x: T) {
    switch (typeof x) {
        case 'number': assertNumber(x); return;
        case 'boolean': assertBoolean(x); return;
        case 'function': assertAll(x); return;
        case 'symbol': assertSymbol(x); return;
        case 'object': assertAll(x); return;
        case 'string': assertString(x); return;
        case 'undefined': assertUndefined(x); return;
    }
    assertAll(x);
}

function testAny(x: any) {
    switch (typeof x) {
        case 'number': assertNumber(x); return;
        case 'boolean': assertBoolean(x); return;
        case 'function': assertFunction(x); return;
        case 'symbol': assertSymbol(x); return;
        case 'object': assertObject(x); return;
        case 'string': assertString(x); return;
        case 'undefined': assertUndefined(x); return;
    }
    assertAll(x); // is any
}

function a1(x: string | object | undefined) {
    return x;
}

function testUnionExplicitDefault(x: Basic) {
    switch (typeof x) {
        case 'number': assertNumber(x); return;
        case 'boolean': assertBoolean(x); return;
        case 'function': assertFunction(x); return;
        case 'symbol': assertSymbol(x); return;
        default: a1(x); return;
    }
}

function testUnionImplicitDefault(x: Basic) {
    switch (typeof x) {
        case 'number': assertNumber(x); return;
        case 'boolean': assertBoolean(x); return;
        case 'function': assertFunction(x); return;
        case 'symbol': assertSymbol(x); return;
    }
    return a1(x);
}

function testExtendsExplicitDefault<T extends Basic>(x: T) {
    switch (typeof x) {
        case 'number': assertNumber(x); return;
        case 'boolean': assertBoolean(x); return;
        case 'function': assertAll(x); return;
        case 'symbol': assertSymbol(x); return;
        default: assertAll(x); return;

    }
}

function testExtendsImplicitDefault<T extends Basic>(x: T) {
    switch (typeof x) {
        case 'number': assertNumber(x); return;
        case 'boolean': assertBoolean(x); return;
        case 'function': assertAll(x); return;
        case 'symbol': assertSymbol(x); return;
    }
    return assertAll(x);
}

type L = (x: number) => string;
type R = { x: string, y: number }

function exhaustiveChecks(x: number | string | L | R): string {
    switch (typeof x) {
        case 'number': return x.toString(2);
        case 'string': return x;
        case 'function': return x(42);
        case 'object': return x.x;
    }
}

function exhaustiveChecksGenerics<T extends L | R | number | string>(x: T): string {
    switch (typeof x) {
        case 'number': return x.toString(2);
        case 'string': return x;
        case 'function': return (x as L)(42); // Can't narrow generic
        case 'object': return (x as R).x;            // Can't narrow generic
    }
}

function multipleGeneric<X extends L, Y extends R>(xy: X | Y): [X, string] | [Y, number] {
    switch (typeof xy) {
        case 'function': return [xy, xy(42)];
        case 'object': return [xy, xy.y];
        default: return assertNever(xy);
    }
}

function multipleGenericFuse<X extends L | number, Y extends R | number>(xy: X | Y): [X, number] | [Y, string] | [(X | Y)] {
    switch (typeof xy) {
        case 'function': return [xy, 1];
        case 'object': return [xy, 'two'];
        case 'number': return [xy]
    }
}

function multipleGenericExhaustive<X extends L, Y extends R>(xy: X | Y): [X, string] | [Y, number] {
    switch (typeof xy) {
        case 'object': return [xy, xy.y];
        case 'function': return [xy, xy(42)];
    }
}

function switchOrdering(x: string | number | boolean) {
    switch (typeof x) {
        case 'string': return assertString(x);
        case 'number': return assertNumber(x);
        case 'boolean': return assertBoolean(x);
        case 'number': return assertNever(x);
    }
}

function switchOrderingWithDefault(x: string | number | boolean) {
    function local(y: string | number | boolean) {
        return x;
    }
    switch (typeof x) {
        case 'string':
        case 'number':
        default: return local(x)
        case 'string': return assertNever(x);
        case 'number': return assertNever(x);
    }
}

function fallThroughTest(x: string | number | boolean | object) {
    switch (typeof x) {
        case 'number':
            assertNumber(x)
        case 'string':
            assertStringOrNumber(x)
            break;
        default:
            assertObject(x);
        case 'number':
        case 'boolean':
            assertBooleanOrObject(x);
            break;
    }
}

function unknownNarrowing(x: unknown) {
    switch (typeof x) {
        case 'number': assertNumber(x); return;
        case 'boolean': assertBoolean(x); return;
        case 'function': assertFunction(x); return;
        case 'symbol': assertSymbol(x); return;
        case 'object': assertObjectOrNull(x); return;
        case 'string': assertString(x); return;
        case 'undefined': assertUndefined(x); return;
    }
}

function keyofNarrowing<S extends { [K in keyof S]: string }>(k: keyof S) {
    function assertKeyofS(k1: keyof S) { }
    switch (typeof k) {
        case 'number': assertNumber(k); assertKeyofS(k); return;
        case 'symbol': assertSymbol(k); assertKeyofS(k); return;
        case 'string': assertString(k); assertKeyofS(k); return;
    }
}

function narrowingNarrows(x: {} | undefined) {
    switch (typeof x) {
        case 'number': assertNumber(x); return;
        case 'boolean': assertBoolean(x); return;
        case 'function': assertFunction(x); return;
        case 'symbol': assertSymbol(x); return;
        case 'object': const _: {} = x; return;
        case 'string': assertString(x); return;
        case 'undefined': assertUndefined(x); return;
        case 'number': assertNever(x); return;
        default: const _y: {} = x; return;
    }
}

function narrowingNarrows2(x: true | 3 | 'hello' | undefined) {
    switch (typeof x) {
        case 'number': assertNumber(x); return;
        case 'boolean': assertBoolean(x); return;
        case 'function': assertNever(x); return;
        case 'symbol': assertNever(x); return;
        case 'object': const _: {} = assertNever(x); return;
        case 'string': assertString(x); return;
        case 'undefined': assertUndefined(x); return;
        case 'number': assertNever(x); return;
        default: const _y: {} = assertNever(x); return;
    }
}

/* Template literals */

function testUnionWithTempalte(x: Basic) {
    switch (typeof x) {
        case `number`: assertNumber(x); return;
        case `boolean`: assertBoolean(x); return;
        case `function`: assertFunction(x); return;
        case `symbol`: assertSymbol(x); return;
        case `object`: assertObject(x); return;
        case `string`: assertString(x); return;
        case `undefined`: assertUndefined(x); return;
    }
    assertNever(x);
}

function fallThroughTestWithTempalte(x: string | number | boolean | object) {
    switch (typeof x) {
        case `number`:
            assertNumber(x)
        case `string`:
            assertStringOrNumber(x)
            break;
        default:
            assertObject(x);
        case `number`:
        case `boolean`:
            assertBooleanOrObject(x);
            break;
    }
}

function keyofNarrowingWithTemplate<S extends { [K in keyof S]: string }>(k: keyof S) {
    function assertKeyofS(k1: keyof S) { }
    switch (typeof k) {
        case `number`: assertNumber(k); assertKeyofS(k); return;
        case `symbol`: assertSymbol(k); assertKeyofS(k); return;
        case `string`: assertString(k); assertKeyofS(k); return;
    }
}

/* Both string literals and template literals */

function multipleGenericFuseWithBoth<X extends L | number, Y extends R | number>(xy: X | Y): [X, number] | [Y, string] | [(X | Y)] {
    switch (typeof xy) {
        case `function`: return [xy, 1];
        case 'object': return [xy, 'two'];
        case `number`: return [xy]
    }
}


//// [narrowingByTypeofInSwitch.js]
"use strict";
function assertNever(x) {
    return x;
}
function assertNumber(x) {
    return x;
}
function assertBoolean(x) {
    return x;
}
function assertString(x) {
    return x;
}
function assertSymbol(x) {
    return x;
}
function assertFunction(x) {
    return x;
}
function assertObject(x) {
    return x;
}
function assertObjectOrNull(x) {
    return x;
}
function assertUndefined(x) {
    return x;
}
function assertAll(x) {
    return x;
}
function assertStringOrNumber(x) {
    return x;
}
function assertBooleanOrObject(x) {
    return x;
}
function testUnion(x) {
    switch (typeof x) {
        case 'number':
            assertNumber(x);
            return;
        case 'boolean':
            assertBoolean(x);
            return;
        case 'function':
            assertFunction(x);
            return;
        case 'symbol':
            assertSymbol(x);
            return;
        case 'object':
            assertObject(x);
            return;
        case 'string':
            assertString(x);
            return;
        case 'undefined':
            assertUndefined(x);
            return;
    }
    assertNever(x);
}
function testExtendsUnion(x) {
    switch (typeof x) {
        case 'number':
            assertNumber(x);
            return;
        case 'boolean':
            assertBoolean(x);
            return;
        case 'function':
            assertAll(x);
            return;
        case 'symbol':
            assertSymbol(x);
            return;
        case 'object':
            assertAll(x);
            return;
        case 'string':
            assertString(x);
            return;
        case 'undefined':
            assertUndefined(x);
            return;
    }
    assertAll(x);
}
function testAny(x) {
    switch (typeof x) {
        case 'number':
            assertNumber(x);
            return;
        case 'boolean':
            assertBoolean(x);
            return;
        case 'function':
            assertFunction(x);
            return;
        case 'symbol':
            assertSymbol(x);
            return;
        case 'object':
            assertObject(x);
            return;
        case 'string':
            assertString(x);
            return;
        case 'undefined':
            assertUndefined(x);
            return;
    }
    assertAll(x); // is any
}
function a1(x) {
    return x;
}
function testUnionExplicitDefault(x) {
    switch (typeof x) {
        case 'number':
            assertNumber(x);
            return;
        case 'boolean':
            assertBoolean(x);
            return;
        case 'function':
            assertFunction(x);
            return;
        case 'symbol':
            assertSymbol(x);
            return;
        default:
            a1(x);
            return;
    }
}
function testUnionImplicitDefault(x) {
    switch (typeof x) {
        case 'number':
            assertNumber(x);
            return;
        case 'boolean':
            assertBoolean(x);
            return;
        case 'function':
            assertFunction(x);
            return;
        case 'symbol':
            assertSymbol(x);
            return;
    }
    return a1(x);
}
function testExtendsExplicitDefault(x) {
    switch (typeof x) {
        case 'number':
            assertNumber(x);
            return;
        case 'boolean':
            assertBoolean(x);
            return;
        case 'function':
            assertAll(x);
            return;
        case 'symbol':
            assertSymbol(x);
            return;
        default:
            assertAll(x);
            return;
    }
}
function testExtendsImplicitDefault(x) {
    switch (typeof x) {
        case 'number':
            assertNumber(x);
            return;
        case 'boolean':
            assertBoolean(x);
            return;
        case 'function':
            assertAll(x);
            return;
        case 'symbol':
            assertSymbol(x);
            return;
    }
    return assertAll(x);
}
function exhaustiveChecks(x) {
    switch (typeof x) {
        case 'number': return x.toString(2);
        case 'string': return x;
        case 'function': return x(42);
        case 'object': return x.x;
    }
}
function exhaustiveChecksGenerics(x) {
    switch (typeof x) {
        case 'number': return x.toString(2);
        case 'string': return x;
        case 'function': return x(42); // Can't narrow generic
        case 'object': return x.x; // Can't narrow generic
    }
}
function multipleGeneric(xy) {
    switch (typeof xy) {
        case 'function': return [xy, xy(42)];
        case 'object': return [xy, xy.y];
        default: return assertNever(xy);
    }
}
function multipleGenericFuse(xy) {
    switch (typeof xy) {
        case 'function': return [xy, 1];
        case 'object': return [xy, 'two'];
        case 'number': return [xy];
    }
}
function multipleGenericExhaustive(xy) {
    switch (typeof xy) {
        case 'object': return [xy, xy.y];
        case 'function': return [xy, xy(42)];
    }
}
function switchOrdering(x) {
    switch (typeof x) {
        case 'string': return assertString(x);
        case 'number': return assertNumber(x);
        case 'boolean': return assertBoolean(x);
        case 'number': return assertNever(x);
    }
}
function switchOrderingWithDefault(x) {
    function local(y) {
        return x;
    }
    switch (typeof x) {
        case 'string':
        case 'number':
        default: return local(x);
        case 'string': return assertNever(x);
        case 'number': return assertNever(x);
    }
}
function fallThroughTest(x) {
    switch (typeof x) {
        case 'number':
            assertNumber(x);
        case 'string':
            assertStringOrNumber(x);
            break;
        default:
            assertObject(x);
        case 'number':
        case 'boolean':
            assertBooleanOrObject(x);
            break;
    }
}
function unknownNarrowing(x) {
    switch (typeof x) {
        case 'number':
            assertNumber(x);
            return;
        case 'boolean':
            assertBoolean(x);
            return;
        case 'function':
            assertFunction(x);
            return;
        case 'symbol':
            assertSymbol(x);
            return;
        case 'object':
            assertObjectOrNull(x);
            return;
        case 'string':
            assertString(x);
            return;
        case 'undefined':
            assertUndefined(x);
            return;
    }
}
function keyofNarrowing(k) {
    function assertKeyofS(k1) { }
    switch (typeof k) {
        case 'number':
            assertNumber(k);
            assertKeyofS(k);
            return;
        case 'symbol':
            assertSymbol(k);
            assertKeyofS(k);
            return;
        case 'string':
            assertString(k);
            assertKeyofS(k);
            return;
    }
}
function narrowingNarrows(x) {
    switch (typeof x) {
        case 'number':
            assertNumber(x);
            return;
        case 'boolean':
            assertBoolean(x);
            return;
        case 'function':
            assertFunction(x);
            return;
        case 'symbol':
            assertSymbol(x);
            return;
        case 'object':
            var _ = x;
            return;
        case 'string':
            assertString(x);
            return;
        case 'undefined':
            assertUndefined(x);
            return;
        case 'number':
            assertNever(x);
            return;
        default:
            var _y = x;
            return;
    }
}
function narrowingNarrows2(x) {
    switch (typeof x) {
        case 'number':
            assertNumber(x);
            return;
        case 'boolean':
            assertBoolean(x);
            return;
        case 'function':
            assertNever(x);
            return;
        case 'symbol':
            assertNever(x);
            return;
        case 'object':
            var _ = assertNever(x);
            return;
        case 'string':
            assertString(x);
            return;
        case 'undefined':
            assertUndefined(x);
            return;
        case 'number':
            assertNever(x);
            return;
        default:
            var _y = assertNever(x);
            return;
    }
}
/* Template literals */
function testUnionWithTempalte(x) {
    switch (typeof x) {
        case "number":
            assertNumber(x);
            return;
        case "boolean":
            assertBoolean(x);
            return;
        case "function":
            assertFunction(x);
            return;
        case "symbol":
            assertSymbol(x);
            return;
        case "object":
            assertObject(x);
            return;
        case "string":
            assertString(x);
            return;
        case "undefined":
            assertUndefined(x);
            return;
    }
    assertNever(x);
}
function fallThroughTestWithTempalte(x) {
    switch (typeof x) {
        case "number":
            assertNumber(x);
        case "string":
            assertStringOrNumber(x);
            break;
        default:
            assertObject(x);
        case "number":
        case "boolean":
            assertBooleanOrObject(x);
            break;
    }
}
function keyofNarrowingWithTemplate(k) {
    function assertKeyofS(k1) { }
    switch (typeof k) {
        case "number":
            assertNumber(k);
            assertKeyofS(k);
            return;
        case "symbol":
            assertSymbol(k);
            assertKeyofS(k);
            return;
        case "string":
            assertString(k);
            assertKeyofS(k);
            return;
    }
}
/* Both string literals and template literals */
function multipleGenericFuseWithBoth(xy) {
    switch (typeof xy) {
        case "function": return [xy, 1];
        case 'object': return [xy, 'two'];
        case "number": return [xy];
    }
}
