//// [keyofKnownPropertiesWithIndexSignature.ts]

interface Foo {
    prop: number;
    [x: string]: number;
}

type t = keyof Foo; // string | "prop"

var x: Partial<Foo>;
x.prop; // ok
x["other"].toFixed();

var y: Pick<Foo, keyof Foo>;
y.prop; // ok
y["other"].toFixed();






//// [keyofKnownPropertiesWithIndexSignature.js]
var x;
x.prop; // ok
x["other"].toFixed();
var y;
y.prop; // ok
y["other"].toFixed();
