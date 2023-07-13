//// [tests/cases/compiler/forOfStringConstituents.ts] ////

//// [forOfStringConstituents.ts]
interface A { x: 0; y: C[]; }
interface B { x: 1; y: CD[]; }
interface C { x: 2; }
interface D { x: 3; }
type AB = A | B;
type CD = C | D;
declare let x: AB, y: CD;
for (y of x.y);

//// [forOfStringConstituents.js]
for (var _i = 0, _a = x.y; _i < _a.length; _i++) {
    y = _a[_i];
    ;
}
