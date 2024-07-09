// @noImplicitAny: true
class C { }
declare var a: { m(...string): void }
declare var b: (string, C) => void;
declare var c: { (C, number): void };
declare var d: { m(boolean, C, object, undefined): void }
// note: null and void do not parse correctly without a preceding parameter name
