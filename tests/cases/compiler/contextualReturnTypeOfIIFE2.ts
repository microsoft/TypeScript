// @lib: esnext
// @noImplicitAny: true

declare namespace app {
  function foo(): void;
}

app.foo.bar = (function () {
  const someFun = (arg: number) => {};
  return { someFun };
})();

app.foo.bar.someFun(1);
