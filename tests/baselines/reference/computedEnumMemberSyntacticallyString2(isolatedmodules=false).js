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
    Foo["A"] = "bar";
    Foo["B"] = "LOCAL";
    Foo["C"] = "LOCAL";
    Foo["D"] = "LOCALBAR";
    Foo[Foo["E1"] = (`${BAR}`)] = "E1";
    Foo[Foo["E2"] = `${BAR}`] = "E2";
    Foo["F"] = "bar";
    Foo["G"] = "2bar";
    Foo["H"] = "bar";
    Foo["I"] = "barbar";
    Foo["J"] = "bar";
})(Foo || (Foo = {}));
