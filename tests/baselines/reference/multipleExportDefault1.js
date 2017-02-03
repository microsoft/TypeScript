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
exports["default"] = Foo;
exports["default"] = {
    uhoh: "another default"
};
exports.__esModule = true;
