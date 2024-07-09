//// [tests/cases/conformance/expressions/typeGuards/typeGuardNarrowsToLiteralTypeUnion.ts] ////

//// [typeGuardNarrowsToLiteralTypeUnion.ts]
declare function isFoo(value: string) : value is ("foo" | "bar");
declare function doThis(value: "foo" | "bar"): void;
declare function doThat(value: string) : void;
let value: string;
if (isFoo(value)) {
    doThis(value);
} else {
    doThat(value);
}



//// [typeGuardNarrowsToLiteralTypeUnion.js]
var value;
if (isFoo(value)) {
    doThis(value);
}
else {
    doThat(value);
}
