// @target: es6

interface C {
  [C.a](): void;
  [C.b]: void;
}
class C {
  static readonly a = Symbol();
  static readonly b = Symbol();
}
