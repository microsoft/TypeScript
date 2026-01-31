//// [tests/cases/conformance/es6/modules/defaultExportsCannotMerge04.ts] ////

//// [defaultExportsCannotMerge04.ts]
export default function Foo() {
}

namespace Foo {
    export var x;
}

interface Foo {
}

export interface Foo {
}

//// [defaultExportsCannotMerge04.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Foo;
function Foo() {
}
(function (Foo) {
})(exports.Foo || (exports.Foo = {}));
