//// [tests/cases/compiler/contextualReturnTypeOfIIFE3.ts] ////

//// [contextualReturnTypeOfIIFE3.ts]
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


//// [contextualReturnTypeOfIIFE3.js]
app.foo.bar = (function () {
    return { someFun: function (arg) { } };
})();
app.foo.bar.someFun(1);
