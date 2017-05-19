//// [multipleExportDefault1.ts]
export default function Foo (){
    
}

export default {
    uhoh: "another default",
};


//// [multipleExportDefault1.js]
"use strict";
exports.__esModule = true;
function Foo() {
}
exports["default"] = Foo;
exports["default"] = {
    uhoh: "another default"
};
