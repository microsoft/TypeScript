//// [multipleExportDefault1.ts]
export default function Foo (){
    
}

export default {
    uhoh: "another default",
};


//// [multipleExportDefault1.js]
"use strict";
function Foo() {
}
exports.__esModule = true;
exports["default"] = Foo;
exports.__esModule = true;
exports["default"] = {
    uhoh: "another default"
};
