// @declaration: true
module a.b.c {
      export var d;
}
module a.e.f {
      import g = b.c;
}
