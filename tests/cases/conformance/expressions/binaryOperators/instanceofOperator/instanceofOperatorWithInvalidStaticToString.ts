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
