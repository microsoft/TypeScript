//// [tests/cases/compiler/indexAccessCombinedInference.ts] ////

//// [indexAccessCombinedInference.ts]
// Simple case
interface Args {
    TA: object,
    TY: object
}

declare function foo<T extends Args>(
    a: T["TA"],
    b: T["TY"]): T["TA"] & T["TY"];

const x = foo({
    x: {
        j: 12,
        i: 11
    }
}, { y: 42 });

// Union result type
interface A {
    foo: number;
}
interface B {
    bar: string;
}
declare const something: A | B;

const y = foo(something, { bat: 42 });

// Union key type
interface Args2 {
    TA?: object, // Optional since only one of TA or TB needs to be infered in the below argument list
    TB?: object,
    TY: object
}
declare function foo2<T extends Args2>(
    a: T["TA"] | T["TB"],
    b: T["TY"]): {a: T["TA"], b: T["TB"]} & T["TY"];
declare function foo3<T extends Args2>( // Morally equivalent to foo2
    a: T["TA" | "TB"],
    b: T["TY"]): {a: T["TA"], b: T["TB"]} & T["TY"];
let z = foo2({
    x: {
        j: 12,
        i: 11
    }
}, { y: 42 });
let zz = foo3({
    x: {
        j: 12,
        i: 11
    }
}, { y: 42 });
z = zz;
zz = z;

// Higher-order
interface Args3 {
    Key: "A" | "B",
    A: object,
    B: object,
    Merge: object,
}
declare const either: "A" | "B";
declare function pickOne<T extends Args3>(key: T["Key"], left: T["A"], right: T["B"], into: T["Merge"]): T[T["Key"]] & T["Merge"];

const opt1 = pickOne("A", {x: 12}, {y: ""}, {z: /./});
const opt2 = pickOne("B", {x: 12}, {y: ""}, {z: /./});
const opt3 = pickOne(either, {x: 12}, {y: ""}, {z: /./});

const pickDelayed = <TKey extends Args3["Key"]>(x: TKey) => pickOne(x, {j: x}, {i: x}, {chosen: x});
const opt4 = pickDelayed("A");
const opt5 = pickDelayed("B");
const opt6 = pickDelayed(either);

// Reopenable
interface Args3 {
    /**
     * One must make patched parameters optional, otherwise signatures expecting the unpatched
     * interface (ie, pickOne above) will not be able to produce a type satisfying the interface
     * (as there are no inference sites for the new members) and will fall back to the constraints on each member
     */
    Extra?: object,
}
declare function pickOne<T extends Args3>(key: T["Key"], left: T["A"], right: T["B"], into: T["Merge"], extra: T["Extra"]): T[T["Key"]] & {into: T["Merge"], extra: T["Extra"]};
const opt7 = pickOne("A", {x: 12}, {y: ""}, {z: /./}, {z: /./});
const opt8 = pickOne("B", {x: 12}, {y: ""}, {z: /./}, {z: /./});
const opt9 = pickOne(either, {x: 12}, {y: ""}, {z: /./}, {z: /./});

// Interactions with `this` types
interface TPicker {
    Key: keyof this,
    X: number,
    Y: string
}
declare function chooseLiteral<T extends TPicker>(choice: T["Key"], x: T["X"], y:T["Y"]): T[T["Key"]];
const cx = chooseLiteral("X", 1, "no");
const cy = chooseLiteral("Y", 0, "yes");
const ceither = chooseLiteral("X" as "X" | "Y", 1, "yes");
const cneither = chooseLiteral("Key", 0, "no");

// Multiple inference sites
interface Args4 {
    0: object,
    1: Record<keyof this[0], Function>,
}
declare function dualInputs<T extends Args4>(x: T[0], y: T[0], toDelay: T[1]): T[0] & {transformers: T[1]};

const result = dualInputs({x: 0}, {x: 1}, {x: () => ""});


//// [indexAccessCombinedInference.js]
var x = foo({
    x: {
        j: 12,
        i: 11
    }
}, { y: 42 });
var y = foo(something, { bat: 42 });
var z = foo2({
    x: {
        j: 12,
        i: 11
    }
}, { y: 42 });
var zz = foo3({
    x: {
        j: 12,
        i: 11
    }
}, { y: 42 });
z = zz;
zz = z;
var opt1 = pickOne("A", { x: 12 }, { y: "" }, { z: /./ });
var opt2 = pickOne("B", { x: 12 }, { y: "" }, { z: /./ });
var opt3 = pickOne(either, { x: 12 }, { y: "" }, { z: /./ });
var pickDelayed = function (x) { return pickOne(x, { j: x }, { i: x }, { chosen: x }); };
var opt4 = pickDelayed("A");
var opt5 = pickDelayed("B");
var opt6 = pickDelayed(either);
var opt7 = pickOne("A", { x: 12 }, { y: "" }, { z: /./ }, { z: /./ });
var opt8 = pickOne("B", { x: 12 }, { y: "" }, { z: /./ }, { z: /./ });
var opt9 = pickOne(either, { x: 12 }, { y: "" }, { z: /./ }, { z: /./ });
var cx = chooseLiteral("X", 1, "no");
var cy = chooseLiteral("Y", 0, "yes");
var ceither = chooseLiteral("X", 1, "yes");
var cneither = chooseLiteral("Key", 0, "no");
var result = dualInputs({ x: 0 }, { x: 1 }, { x: function () { return ""; } });
