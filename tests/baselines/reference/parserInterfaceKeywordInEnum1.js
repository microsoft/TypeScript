//// [tests/cases/conformance/parser/ecmascript5/EnumDeclarations/parserInterfaceKeywordInEnum1.ts] ////

//// [parserInterfaceKeywordInEnum1.ts]
"use strict";

enum Bar {
    interface,
}


//// [parserInterfaceKeywordInEnum1.js]
"use strict";
var Bar;
(function (Bar) {
    Bar[Bar["interface"] = 0] = "interface";
})(Bar || (Bar = {}));
