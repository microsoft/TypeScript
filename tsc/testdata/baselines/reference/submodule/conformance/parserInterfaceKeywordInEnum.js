//// [tests/cases/conformance/parser/ecmascript5/EnumDeclarations/parserInterfaceKeywordInEnum.ts] ////

//// [parserInterfaceKeywordInEnum.ts]
enum Bar {
    interface,
}


//// [parserInterfaceKeywordInEnum.js]
"use strict";
var Bar;
(function (Bar) {
    Bar[Bar["interface"] = 0] = "interface";
})(Bar || (Bar = {}));
