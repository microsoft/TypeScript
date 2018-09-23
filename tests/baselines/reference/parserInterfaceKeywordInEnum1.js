//// [parserInterfaceKeywordInEnum1.ts]
"use strict";

enum Bar {
    interface,
}


//// [parserInterfaceKeywordInEnum1.js]
"use strict";
var Bar = Bar || (Bar = {});
(function (Bar) {
    Bar[Bar["interface"] = 0] = "interface";
})(Bar);
