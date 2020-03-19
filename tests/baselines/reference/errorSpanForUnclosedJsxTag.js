//// [errorSpanForUnclosedJsxTag.tsx]
declare const React: any

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
var x = React.createElement(Foo.Bar, null,
    "Hello let y = ",
    React.createElement(Baz, null, "Hello"));
