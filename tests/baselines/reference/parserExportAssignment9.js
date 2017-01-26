//// [parserExportAssignment9.ts]
namespace Foo {
  export default foo;
}

module Bar {
  export default bar;
}

//// [parserExportAssignment9.js]
var Foo;
(function (Foo) {
    export default foo;
})(Foo || (Foo = {}));
var Bar;
(function (Bar) {
    export default bar;
})(Bar || (Bar = {}));
