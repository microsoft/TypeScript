// @target: es6

interface C {
  [C.a](): void;
  [C.b]: void;
}
class C {
  [C.c] = 1;
  static readonly a = Symbol();
  static readonly b = Symbol();
  static readonly c = Symbol();
}

class D {
  [D.a] = 0;
  static a = "a";
}