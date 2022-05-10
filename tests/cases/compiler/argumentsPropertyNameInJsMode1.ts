// @allowJs: true
// @checkJs: true
// @declaration: true
// @outDir: ./out
// @filename: a.js

const foo = {
   f1: (params) => { }
}

function f2(x) {
  foo.f1({ x, arguments: [] });
}

f2(1, 2, 3);
