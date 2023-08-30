//// [tests/cases/conformance/expressions/binaryOperators/instanceofOperator/instanceofOperatorWithInvalidStaticToString.ts] ////

//// [instanceofOperatorWithInvalidStaticToString.ts]
declare class StaticToString {
    static toString(): void;
}

function foo(staticToString: StaticToString) {
    return staticToString instanceof StaticToString;
}

declare class StaticToNumber {
    static toNumber(): void;
}
function bar(staticToNumber: StaticToNumber) {
    return staticToNumber instanceof StaticToNumber;
}

declare class NormalToString {
    toString(): void;
}
function baz(normal: NormalToString) {
    return normal instanceof NormalToString;
}


//// [instanceofOperatorWithInvalidStaticToString.js]
function foo(staticToString) {
    return staticToString instanceof StaticToString;
}
function bar(staticToNumber) {
    return staticToNumber instanceof StaticToNumber;
}
function baz(normal) {
    return normal instanceof NormalToString;
}
