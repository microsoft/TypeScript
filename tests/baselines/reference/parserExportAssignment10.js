//// [parserExportAssignment10.ts]
export default "123";
namespace Foo {
  var foo;
  export foo;
}

//// [parserExportAssignment10.js]
"use strict";
exports.__esModule = true;
exports["default"] = "123";
var Foo;
(function (Foo) {
    var foo;
    foo;
})(Foo || (Foo = {}));
