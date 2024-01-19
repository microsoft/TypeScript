// @strict: true
// @checkJs: true
// @target: esnext
// @noEmit: true

// @filename: index.js

class C {
  static blah1 = 123;
}
C.blah2 = 456;

class D extends C {
  static {
    console.log(super.blah1);
    console.log(super.blah2);
  }
}
