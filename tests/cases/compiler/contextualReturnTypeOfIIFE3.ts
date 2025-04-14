// @lib: esnext
// @noImplicitAny: true

declare namespace app {
  var foo: {
    bar: {
      someFun: (arg: number) => void;
    };
  };
}

app.foo.bar = (function () {
  return { someFun(arg) {} };
})();

app.foo.bar.someFun(1);
