//// [errorSpanForUnclosedJsxTag.tsx]
let Foo = {
  Bar() {}
}

let Baz = () => {}

let x = <    Foo.Bar >Hello

let y = <   Baz >Hello

//// [errorSpanForUnclosedJsxTag.js]
var Foo = {
    Bar: function () { }
};
var Baz = function () { };
var x = <Foo.Bar>Hello

let y = <Baz>Hello</></>;
