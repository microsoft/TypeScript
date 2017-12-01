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
function Foo() {
}
exports.default = Foo;
(function (Foo) {
})(Foo || (Foo = {}));
