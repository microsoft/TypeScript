//// [InfinityAndNaNTypes.ts]
Infinity = 42; // error
NaN = 42; // error

type PositiveInfinity = Infinity;
type NegativeInfinity = -Infinity;
type NotANumber = NaN | -NaN;

type typeofInfinity = typeof Infinity;
type typeofNaN = typeof NaN;

type isInfinity = typeofInfinity extends PositiveInfinity ? true : false;
type isNaN = NotANumber extends typeofNaN ? true : false;

const c1 = Infinity;
const c2 = -Infinity;
const c3 = NaN;
const c4 = -NaN;
const c5: Infinity = Infinity;
const c6: -Infinity = -Infinity;
const c7: NaN = NaN;
const c8: -NaN = -NaN;

type ExtractNumber<T extends string, U extends number = number> = T extends `${infer T extends U}` ? T : never;

type t1 = ExtractNumber<"Infinity">; // never
type t2 = ExtractNumber<"-Infinity">; // never
type t3 = ExtractNumber<"NaN">; // never
type t4 = ExtractNumber<"-NaN">; // never
type t5 = ExtractNumber<"Infinity", Infinity>;
type t6 = ExtractNumber<"-Infinity", -Infinity>;
type t7 = ExtractNumber<"NaN", NaN>;
type t8 = ExtractNumber<"-NaN", -NaN>; // never

const o1 = { Infinity, NaN };
o1.Infinity;
o1.NaN;
o1[Infinity];
o1[NaN];
const o2 = { Infinity, NaN } as const;
o2.Infinity;
o2.NaN;
o2[Infinity];
o2[NaN];
const o3 = { Infinity: "foo", "-Infinity": "bar", NaN: "baz", "-NaN": "no" };
o3.Infinity;
o3[-Infinity];
o3.NaN;
o3[-NaN];
const o4 = { Infinity: "foo", "-Infinity": "bar", NaN: "baz", "-NaN": "no" } as const;
o4[Infinity];
o4[-Infinity];
o4[NaN];
o4[-NaN]; // baz
const o5 = { [Infinity]: "foo", [-Infinity]: "bar", [NaN]: "baz", [-NaN]: "no" };
o5.Infinity;
o5[-Infinity];
o5.NaN;
o5[-NaN];
const o6 = { [Infinity]: "foo", [-Infinity]: "bar", [NaN]: "baz", [-NaN]: "no" } as const;
o6.Infinity;
o6["-Infinity"];
o6.NaN;
o6["-NaN"]; // error

enum Foo {
  PositiveInfinity = 1 / 0,
  NegativeInfinity = 1 / -0,
  Infinity = PositiveInfinity,
  Zero = 1 / Infinity,
  One,
  NaN = (-2) ** 0.5,
}

const e1: Infinity = Foo.PositiveInfinity;
const e2: -Infinity = Foo.NegativeInfinity;
const e3: Infinity = Foo.Infinity;
const e4: 0 = Foo.Zero;
const e5: 1 = Foo.One;
const e6: NaN = Foo.NaN;

// should be widen to number
let v1 = Infinity;
let v2 = -Infinity;
let v3 = NaN;
let v4 = -NaN;


//// [InfinityAndNaNTypes.js]
"use strict";
var _a, _b;
Infinity = 42; // error
NaN = 42; // error
var c1 = Infinity;
var c2 = -Infinity;
var c3 = NaN;
var c4 = -NaN;
var c5 = Infinity;
var c6 = -Infinity;
var c7 = NaN;
var c8 = -NaN;
var o1 = { Infinity: Infinity, NaN: NaN };
o1.Infinity;
o1.NaN;
o1[Infinity];
o1[NaN];
var o2 = { Infinity: Infinity, NaN: NaN };
o2.Infinity;
o2.NaN;
o2[Infinity];
o2[NaN];
var o3 = { Infinity: "foo", "-Infinity": "bar", NaN: "baz", "-NaN": "no" };
o3.Infinity;
o3[-Infinity];
o3.NaN;
o3[-NaN];
var o4 = { Infinity: "foo", "-Infinity": "bar", NaN: "baz", "-NaN": "no" };
o4[Infinity];
o4[-Infinity];
o4[NaN];
o4[-NaN]; // baz
var o5 = (_a = {}, _a[Infinity] = "foo", _a[-Infinity] = "bar", _a[NaN] = "baz", _a[-NaN] = "no", _a);
o5.Infinity;
o5[-Infinity];
o5.NaN;
o5[-NaN];
var o6 = (_b = {}, _b[Infinity] = "foo", _b[-Infinity] = "bar", _b[NaN] = "baz", _b[-NaN] = "no", _b);
o6.Infinity;
o6["-Infinity"];
o6.NaN;
o6["-NaN"]; // error
var Foo;
(function (Foo) {
    Foo[Foo["PositiveInfinity"] = Infinity] = "PositiveInfinity";
    Foo[Foo["NegativeInfinity"] = -Infinity] = "NegativeInfinity";
    Foo[Foo["Infinity"] = Infinity] = "Infinity";
    Foo[Foo["Zero"] = 0] = "Zero";
    Foo[Foo["One"] = 1] = "One";
    Foo[Foo["NaN"] = NaN] = "NaN";
})(Foo || (Foo = {}));
var e1 = Foo.PositiveInfinity;
var e2 = Foo.NegativeInfinity;
var e3 = Foo.Infinity;
var e4 = Foo.Zero;
var e5 = Foo.One;
var e6 = Foo.NaN;
// should be widen to number
var v1 = Infinity;
var v2 = -Infinity;
var v3 = NaN;
var v4 = -NaN;
