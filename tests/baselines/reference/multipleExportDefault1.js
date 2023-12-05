//// [tests/cases/conformance/externalModules/multipleExportDefault1.ts] ////

//// [multipleExportDefault1.ts]
export default function Foo (){
    
}

export default {
    uhoh: "another default",
};


//// [multipleExportDefault1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Foo() {
}
exports.default = Foo;
exports.default = {
    uhoh: "another default",
};
