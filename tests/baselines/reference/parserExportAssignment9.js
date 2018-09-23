//// [parserExportAssignment9.ts]
namespace Foo {
  export default foo;
}

module Bar {
  export default bar;
}

//// [parserExportAssignment9.js]
var Foo = Foo || (Foo = {});
(function (Foo) {
    export default foo;
})(Foo);
var Bar = Bar || (Bar = {});
(function (Bar) {
    export default bar;
})(Bar);
