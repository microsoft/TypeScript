// @noImplicitAny: true
class C { }
declare var x: (string, C) => void;
declare var y: { (C, number): void };
declare var z: { m(boolean, C, object, undefined): void }
// note: null and void do not parse correctly without a preceding parameter name
