// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: test.js

function f(x) {}
f(); // Always been ok

class C {
  static m(x) {}
  p = x => {}
  m(x) {}
}

C.m();       // Always been ok
new C().m(); // Regression #39261
new C().p(); // Regression #39261

const obj = {
  m(x) {},
  p: x => {}
};

obj.m(); // Always been ok
obj.p(); // Always been ok
