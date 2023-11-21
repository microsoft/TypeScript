// @lib: esnext
// @noImplicitAny: true
// @isolatedDeclarationDiffReason: TODO Nested access to expando function.

declare namespace app {
  function foo(): void;
}

app.foo.bar = (function () {
  const someFun = (arg: number) => {};
  return { someFun };
})();

app.foo.bar.someFun(1);
