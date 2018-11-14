// @noImplicitAny: true
class C { }
declare var x: (string, C) => void;
declare var y: { (C, number): void };
declare var z: { m(boolean, C, object, void, null, undefined): void }
