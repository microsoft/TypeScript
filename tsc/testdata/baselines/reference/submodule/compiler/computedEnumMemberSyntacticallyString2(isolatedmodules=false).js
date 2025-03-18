//// [tests/cases/compiler/computedEnumMemberSyntacticallyString2.ts] ////

//// [foo.ts]
import { BAR } from './bar';
const LOCAL = 'LOCAL';

enum Foo {
  A = `${BAR}`,

  B = LOCAL,
  C = B,
  D = C + 'BAR',

  E1 = (`${BAR}`) as string, // We could recognize these,
  E2 = `${BAR}`!,             // but Babel doesn't

  F = BAR,
  G = 2 + BAR,

  H = A,
  I = H + BAR,
  J = H
}

//// [bar.ts]
export const BAR = 'bar';

//// [bar.js]
export const BAR = 'bar';
//// [foo.js]
import { BAR } from './bar';
const LOCAL = 'LOCAL';
var Foo;
(function (Foo) {
    Foo["A"] = `${BAR}`;
    if (typeof Foo.A !== "string") Foo[Foo.A] = "A";
    Foo["B"] = LOCAL;
    if (typeof Foo.B !== "string") Foo[Foo.B] = "B";
    Foo["C"] = Foo.B;
    if (typeof Foo.C !== "string") Foo[Foo.C] = "C";
    Foo["D"] = Foo.C + 'BAR';
    if (typeof Foo.D !== "string") Foo[Foo.D] = "D";
    Foo["E1"] = (`${BAR}`);
    if (typeof Foo.E1 !== "string") Foo[Foo.E1] = "E1";
    Foo["E2"] = `${BAR}`;
    if (typeof Foo.E2 !== "string") Foo[Foo.E2] = "E2";
    Foo["F"] = BAR;
    if (typeof Foo.F !== "string") Foo[Foo.F] = "F";
    Foo["G"] = 2 + BAR;
    if (typeof Foo.G !== "string") Foo[Foo.G] = "G";
    Foo["H"] = Foo.A;
    if (typeof Foo.H !== "string") Foo[Foo.H] = "H";
    Foo["I"] = Foo.H + BAR;
    if (typeof Foo.I !== "string") Foo[Foo.I] = "I";
    Foo["J"] = Foo.H;
    if (typeof Foo.J !== "string") Foo[Foo.J] = "J";
})(Foo || (Foo = {}));
