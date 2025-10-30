//// [tests/cases/conformance/parser/ecmascript5/ExportAssignments/parserExportAssignment9.ts] ////

//// [parserExportAssignment9.ts]
namespace Foo {
  export default foo;
}

namespace Bar {
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
